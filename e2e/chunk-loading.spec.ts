import { expect, test } from '@playwright/test'
import {
  buildInstanceUrl,
  getUnexpectedChunks,
  verifyChunksNotLoaded,
  waitForChunkLoad,
} from './helpers/chunk-loading.helpers'

/**
 * Chunk Loading E2E Tests
 *
 * These tests validate the code-splitting strategy by verifying JavaScript chunks
 * load at the correct time during the user journey and NOT prematurely.
 *
 */
test.skip(({ browserName }) => browserName !== 'chromium', 'Chunk tests only run on Chromium')

// Load instances configuration
const INSTANCES_JSON_URL = 'http://localhost:8080/instances.json'

interface InstanceConfig {
  config: Record<string, string>
}

interface InstancesData {
  instances: Record<string, InstanceConfig[]>
}

// Get instances for test generation
const getInstances = async (): Promise<Record<string, InstanceConfig[]>> => {
  const response = await fetch(INSTANCES_JSON_URL)
  if (!response.ok) {
    throw new Error(`Failed to load instances.json: ${response.status} ${response.statusText}`)
  }
  const data = (await response.json()) as InstancesData
  return data.instances
}

// Generate tests for each instance
const instances = await getInstances()

for (const [instanceName, configs] of Object.entries(instances)) {
  // Test only the first config of each instance (can be modified to test all)
  const config = configs[0].config

  test.describe(`Instance: ${instanceName}`, () => {
    test(`should load chunks correctly through user flow`, async ({ page }) => {
      const baseUrl = 'http://localhost:8080'
      const instanceUrl = buildInstanceUrl(baseUrl, instanceName, config)

      // ========================================
      // STATE 1: Initial Page Load
      // ========================================
      await page.goto(instanceUrl)

      // Wait for app to initialize
      await page.waitForLoadState('networkidle')

      // Get all loaded JavaScript files using Performance API
      const debugInfo = await page.evaluate(() => {
        const resources = (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
          .filter(entry => entry.name.endsWith('.js'))
          .map(entry => ({
            url: entry.name,
            name: entry.name.split('/').pop() || '',
            type: entry.initiatorType,
          }))

        // Also check for scripts in the DOM
        const scriptTags = Array.from(document.querySelectorAll('script')).map(script => {
          const src = script.src
          const type = script.type
          return {
            src,
            type,
            hasSerc: !!src,
          }
        })

        return { resources, scriptTags }
      })

      const loadedChunks = debugInfo.resources.map(r => r.name)

      // Also add scripts from DOM that have src
      const domScripts = debugInfo.scriptTags
        .filter(s => s.src)
        .map(s => s.src.split('/').pop() || '')
        .filter(name => name.endsWith('.js'))

      loadedChunks.push(...domScripts)

      // Deduplicate
      const uniqueChunks = [...new Set(loadedChunks)]

      // Verify app.js loaded
      const appJsLoaded = uniqueChunks.includes('app.js')
      expect(appJsLoaded, 'app.js should be loaded on initial page load').toBe(true)

      // Check for optional instance-init chunk (may or may not exist)
      const instanceInitPattern = new RegExp(`${instanceName}-init.*\\.js`)
      const hasInstanceInit = uniqueChunks.some(chunk => instanceInitPattern.test(chunk))

      test.info().annotations.push({
        type: 'instance-init-chunk',
        description: hasInstanceInit
          ? `✓ Found instance init chunk for ${instanceName}`
          : `○ No instance init chunk for ${instanceName} (optional)`,
      })

      // ========================================
      // VALIDATION: Only allowed chunks at init stage
      // ========================================
      const allowedChunksInit = [
        /^app\.js$/,
        /^[a-z]{2}\.messages-.*\.js$/, // i18n message chunks (e.g., en.messages-*.js, es.messages-*.js)
        new RegExp(`^${instanceName}-init.*\\.js$`), // Optional instance init
        /^snippet-script\.js$/, // Snippet script loaded from public folder
        /^vite.*\.js$/, // Vite dev runtime chunks (only in dev mode)
        /@vite/, // Vite client
        /^wysiwyg.*\.js$/, // WYSIWYG editor component
        /^use-config-.*\.js$/, // WYSIWYG Config composable chunk
      ]

      const unexpectedChunksInit = await getUnexpectedChunks(page, allowedChunksInit)

      expect(
        unexpectedChunksInit,
        `❌ UNEXPECTED CHUNKS at init stage: ${unexpectedChunksInit.join(', ')}. Only allowed: app.js, ${instanceName}-init.js (optional), snippet-script.js`,
      ).toHaveLength(0)

      test.info().annotations.push({
        type: 'validation-init',
        description:
          unexpectedChunksInit.length === 0
            ? '✓ No unexpected chunks at init stage'
            : `❌ Unexpected chunks found: ${unexpectedChunksInit.join(', ')}`,
      })

      // Verify that future chunks are NOT loaded yet (including instance-specific)
      const instanceEmptySearchPattern = new RegExp(`${instanceName}-empty-search.*\\.js`)
      const instanceSearchPattern = new RegExp(`${instanceName}-search.*\\.js`)

      const futureChunksAfterInit = await verifyChunksNotLoaded(page, [
        /x-empty-search.*\.js/,
        instanceEmptySearchPattern,
        /x-search.*\.js/,
        instanceSearchPattern,
      ])

      const emptySearchNotLoaded = !futureChunksAfterInit[0].found
      const instanceEmptySearchNotLoaded = !futureChunksAfterInit[1].found
      const searchNotLoaded = !futureChunksAfterInit[2].found
      const instanceSearchNotLoaded = !futureChunksAfterInit[3].found

      expect(
        emptySearchNotLoaded,
        'x-empty-search chunk should NOT be loaded on initial page load',
      ).toBe(true)
      expect(
        instanceEmptySearchNotLoaded,
        `${instanceName}-empty-search chunk should NOT be loaded on initial page load`,
      ).toBe(true)
      expect(searchNotLoaded, 'x-search chunk should NOT be loaded on initial page load').toBe(true)
      expect(
        instanceSearchNotLoaded,
        `${instanceName}-search chunk should NOT be loaded on initial page load`,
      ).toBe(true)

      test.info().annotations.push({
        type: 'negative-check-init',
        description: `✓ Verified future chunks not loaded: x-empty-search ${emptySearchNotLoaded ? '✓' : '✗'}, ${instanceName}-empty-search ${instanceEmptySearchNotLoaded ? '✓' : '✗'}, x-search ${searchNotLoaded ? '✓' : '✗'}, ${instanceName}-search ${instanceSearchNotLoaded ? '✓' : '✗'}`,
      })

      // ========================================
      // STATE 2: Empty Search (Click Searchbox)
      // ========================================
      const mainSearchInput = page.locator('input[data-test="start-searchbar"]').first()

      // Start waiting for chunk BEFORE clicking
      const emptySearchChunkPromise = waitForChunkLoad(page, /x-empty-search.*\.js/, 5000)

      await mainSearchInput.click()

      // Wait for empty search chunk to load
      const emptySearchChunk = await emptySearchChunkPromise
      expect(
        emptySearchChunk.loaded,
        'x-empty-search chunk should load when clicking searchbox',
      ).toBe(true)

      test.info().annotations.push({
        type: 'empty-search-chunk',
        description: `✓ Loaded: ${emptySearchChunk.chunkName}`,
      })

      // Wait a bit and get all loaded chunks
      await page.waitForTimeout(500)

      const allChunksAfterEmpty = await page.evaluate(() => {
        return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
          .filter(entry => entry.name.endsWith('.js'))
          .map(entry => entry.name.split('/').pop() || '')
      })

      // Check for optional instance-specific empty search chunk
      const hasInstanceEmptySearch = allChunksAfterEmpty.some(chunk =>
        instanceEmptySearchPattern.test(chunk),
      )

      test.info().annotations.push({
        type: 'instance-empty-search-chunk',
        description: hasInstanceEmptySearch
          ? `✓ Found instance empty-search chunk for ${instanceName}`
          : `○ No instance empty-search chunk for ${instanceName} (optional)`,
      })

      // ========================================
      // VALIDATION: Only allowed chunks at empty search stage
      // ========================================
      const allowedChunksEmptySearch = [
        /^app\.js$/,
        new RegExp(`^${instanceName}-init.*\\.js$`), // Optional from init
        /^x-empty-search.*\.js$/, // Required at this stage
        new RegExp(`^${instanceName}-empty-search.*\\.js$`), // Optional instance empty-search
        /^snippet-script\.js$/,
        /^vite.*\.js$/,
        /@vite/,
        /^wysiwyg.*\.js$/, // WYSIWYG editor component
        /^[a-z]{2}\.messages-.*\.js$/, // i18n message chunks
        /^use-config-.*\.js$/, // Config composable chunk
      ]

      const unexpectedChunksEmptySearch = await getUnexpectedChunks(page, allowedChunksEmptySearch)

      expect(
        unexpectedChunksEmptySearch,
        `❌ UNEXPECTED CHUNKS at empty search stage: ${unexpectedChunksEmptySearch.join(', ')}. Only allowed: app.js, x-empty-search.js, ${instanceName}-init.js (optional), ${instanceName}-empty-search.js (optional)`,
      ).toHaveLength(0)

      test.info().annotations.push({
        type: 'validation-empty-search',
        description:
          unexpectedChunksEmptySearch.length === 0
            ? '✓ No unexpected chunks at empty search stage'
            : `❌ Unexpected chunks found: ${unexpectedChunksEmptySearch.join(', ')}`,
      })

      // Verify that x-search chunk (and instance-specific) is NOT loaded yet
      const futureChunksAfterEmpty = await verifyChunksNotLoaded(page, [
        /x-search.*\.js/,
        instanceSearchPattern,
      ])

      const searchNotLoadedYet = !futureChunksAfterEmpty[0].found
      const instanceSearchNotLoadedYet = !futureChunksAfterEmpty[1].found

      expect(
        searchNotLoadedYet,
        'x-search chunk should NOT be loaded during empty search state',
      ).toBe(true)
      expect(
        instanceSearchNotLoadedYet,
        `${instanceName}-search chunk should NOT be loaded during empty search state`,
      ).toBe(true)

      test.info().annotations.push({
        type: 'negative-check-empty-search',
        description: `✓ Verified search chunks not loaded yet: x-search ${searchNotLoadedYet ? '✓' : '✗'}, ${instanceName}-search ${instanceSearchNotLoadedYet ? '✓' : '✗'}`,
      })

      // ========================================
      // STATE 3: Search Results (Submit Query)
      // ========================================

      // Find the search input INSIDE the modal
      const modalSearchInput = page
        .locator('input[type="search"], input[placeholder*="query"]')
        .first()

      // Type a search query in the modal searchbox
      await modalSearchInput.fill('test')

      // Start waiting for chunk BEFORE submitting
      const searchChunkPromise = waitForChunkLoad(page, /x-search.*\.js/, 10000)

      await modalSearchInput.press('Enter')

      // Wait for search to process
      await page.waitForTimeout(1000)
      await page.waitForLoadState('networkidle')

      // Wait for search chunk to load
      const searchChunk = await searchChunkPromise

      expect(searchChunk.loaded, 'x-search chunk should load when submitting search').toBe(true)

      test.info().annotations.push({
        type: 'search-chunk',
        description: `✓ Loaded: ${searchChunk.chunkName}`,
      })

      // Wait a bit and get final chunk list
      await page.waitForTimeout(500)

      const allChunksFinal = await page.evaluate(() => {
        return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
          .filter(entry => entry.name.endsWith('.js'))
          .map(entry => entry.name.split('/').pop() || '')
      })

      // Check for optional instance-specific search chunk
      const hasInstanceSearch = allChunksFinal.some(chunk => instanceSearchPattern.test(chunk))

      test.info().annotations.push({
        type: 'instance-search-chunk',
        description: hasInstanceSearch
          ? `✓ Found instance search chunk for ${instanceName}`
          : `○ No instance search chunk for ${instanceName} (optional)`,
      })

      // ========================================
      // VALIDATION: Only allowed chunks at search results stage
      // ========================================
      const allowedChunksSearch = [
        /^app\.js$/,
        new RegExp(`^${instanceName}-init.*\\.js$`), // Optional from init
        /^x-empty-search.*\.js$/, // From empty search stage
        new RegExp(`^${instanceName}-empty-search.*\\.js$`), // Optional from empty search
        /^x-search.*\.js$/, // Required at this stage
        new RegExp(`^${instanceName}-search.*\\.js$`), // Optional instance search
        /^snippet-script\.js$/,
        /^vite.*\.js$/,
        /@vite/,
        /^wysiwyg.*\.js$/, // WYSIWYG editor component
        /^[a-z]{2}\.messages-.*\.js$/, // i18n message chunks
        /^use-config-.*\.js$/, // Config composable chunk
      ]

      const unexpectedChunksSearch = await getUnexpectedChunks(page, allowedChunksSearch)

      expect(
        unexpectedChunksSearch,
        `❌ UNEXPECTED CHUNKS at search results stage: ${unexpectedChunksSearch.join(', ')}. Only allowed: app.js, x-empty-search.js, x-search.js, ${instanceName}-init.js (optional), ${instanceName}-empty-search.js (optional), ${instanceName}-search.js (optional)`,
      ).toHaveLength(0)

      test.info().annotations.push({
        type: 'validation-search',
        description:
          unexpectedChunksSearch.length === 0
            ? '✓ No unexpected chunks at search results stage'
            : `❌ Unexpected chunks found: ${unexpectedChunksSearch.join(', ')}`,
      })

      // Summary annotation
      const optionalChunksLoaded = [
        hasInstanceInit,
        hasInstanceEmptySearch,
        hasInstanceSearch,
      ].filter(Boolean).length

      test.info().annotations.push({
        type: 'summary',
        description: `✓ Chunk loading flow validated | Required: app.js, x-empty-search, x-search | Optional instance chunks: ${optionalChunksLoaded}/3 | Strict validation: ✓ No unexpected chunks at any stage`,
      })
    })
  })
}
