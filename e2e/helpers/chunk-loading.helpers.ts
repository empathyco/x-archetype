import type { Page } from '@playwright/test'

export interface ChunkLoadResult {
  loaded: boolean
  chunkName?: string
  url?: string
}

/**
 * Waits for a chunk matching the pattern to be loaded via network request
 * NOTE: This must be called BEFORE the action that triggers the chunk load
 */
export async function waitForChunkLoad(
  page: Page,
  chunkPattern: RegExp,
  timeoutMs = 5000,
): Promise<ChunkLoadResult> {
  const startTime = Date.now()

  // Check if already loaded
  const existingChunks = await page.evaluate(() => {
    return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .filter(entry => entry.name.endsWith('.js'))
      .map(entry => entry.name)
  })

  const existingMatch = existingChunks.find(url => chunkPattern.test(url))
  if (existingMatch) {
    return {
      loaded: true,
      chunkName: existingMatch.split('/').pop() || '',
      url: existingMatch,
    }
  }

  // Wait for new request
  return new Promise<ChunkLoadResult>(resolve => {
    let timeout: ReturnType<typeof setTimeout>

    const requestHandler = (request: any) => {
      // eslint-disable-next-line ts/no-unsafe-member-access, ts/no-unsafe-call
      const url: string = request.url() as string
      if (chunkPattern.test(url)) {
        clearTimeout(timeout)
        page.off('request', requestHandler)
        const chunkName: string = url.split('/').pop() || ''
        resolve({ loaded: true, chunkName, url })
      }
    }

    timeout = setTimeout(() => {
      page.off('request', requestHandler)
      resolve({ loaded: false })
    }, timeoutMs)

    page.on('request', requestHandler)

    // Also poll performance API as fallback
    const pollInterval = setInterval(() => {
      if (Date.now() - startTime > timeoutMs) {
        clearInterval(pollInterval)
        return
      }

      void page
        .evaluate(() => {
          return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
            .filter(entry => entry.name.endsWith('.js'))
            .map(entry => entry.name)
        })
        .then((chunks: string[]) => {
          const match = chunks.find(url => chunkPattern.test(url))
          if (match) {
            clearInterval(pollInterval)
            clearTimeout(timeout)
            page.off('request', requestHandler)
            resolve({
              loaded: true,
              chunkName: match.split('/').pop() || '',
              url: match,
            })
          }
        })
    }, 100)
  })
}

/**
 * Verifies specific chunks were loaded during a test phase
 */
export async function verifyChunksLoaded(
  page: Page,
  expectedChunks: RegExp[],
  optionalChunks: RegExp[] = [],
): Promise<{ required: ChunkLoadResult[]; optional: ChunkLoadResult[] }> {
  // Get all network requests made so far
  const requests = await page.evaluate(() => {
    return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .filter(entry => entry.name.includes('.js'))
      .map(entry => entry.name)
  })

  const requiredResults = expectedChunks.map(pattern => {
    const matchedUrl = requests.find(url => pattern.test(url))
    return {
      loaded: !!matchedUrl,
      chunkName: matchedUrl?.split('/').pop(),
      url: matchedUrl,
    }
  })

  const optionalResults = optionalChunks.map(pattern => {
    const matchedUrl = requests.find(url => pattern.test(url))
    return {
      loaded: !!matchedUrl,
      chunkName: matchedUrl?.split('/').pop(),
      url: matchedUrl,
    }
  })

  return { required: requiredResults, optional: optionalResults }
}

/**
 * Verify that specific chunks are NOT loaded yet
 */
export async function verifyChunksNotLoaded(
  page: Page,
  chunksToAvoid: RegExp[],
): Promise<{ pattern: RegExp; found: boolean; chunkName?: string }[]> {
  const loadedChunks = await page.evaluate(() => {
    return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .filter(entry => entry.name.endsWith('.js'))
      .map(entry => entry.name)
  })

  return chunksToAvoid.map(pattern => {
    const matchedUrl = loadedChunks.find(url => pattern.test(url))
    return {
      pattern,
      found: !!matchedUrl,
      chunkName: matchedUrl?.split('/').pop(),
    }
  })
}

/**
 * Verify ONLY expected chunks are loaded (no unexpected chunks)
 * Returns array of unexpected chunks that shouldn't be there
 */
export async function getUnexpectedChunks(
  page: Page,
  allowedPatterns: RegExp[],
): Promise<string[]> {
  const loadedChunks = await page.evaluate(() => {
    return (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
      .filter(entry => entry.name.endsWith('.js'))
      .map(entry => entry.name.split('/').pop() || '')
      .filter(name => name.length > 0)
  })

  // Filter out chunks that match allowed patterns
  const unexpected = loadedChunks.filter(chunk => {
    // Check if chunk matches any allowed pattern
    const isAllowed = allowedPatterns.some(pattern => pattern.test(chunk))
    return !isAllowed
  })

  // Remove duplicates
  return [...new Set(unexpected)]
}

/**
 * Build instance URL from config
 */
export function buildInstanceUrl(
  baseUrl: string,
  instance: string,
  config: Record<string, string>,
): string {
  const params = new URLSearchParams()
  params.set('instance', instance)
  Object.entries(config).forEach(([key, value]) => {
    params.set(key, value)
  })
  return `${baseUrl}?${params.toString()}`
}
