<template>
  <BaseTeleport v-if="visibleGrid" :target="gridTarget">
    <div class="xds:layout-container xds:layout">
      <div class="xds:sticky xds:top-0 xds:z-1 xds:bg-neutral-0">
        <DesktopSubHeader
          v-if="hasSearched"
          data-test="sub-header"
          :is-full-predictive="false"
          class="xds:layout-item"
        />
      </div>

      <MainScroll :use-window="true" class="x-main-scroll xds:mb-24 xds:flex xds:flex-col">
        <Scroll id="main-scroll">
          <div
            class="xds:z-1 xds:layout-item xds:bg-neutral-0 xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
          >
            <div v-if="hasSearched">
              <LocationProvider location="results">
                <SpellcheckMessage class="xds:mb-16" data-test="spellcheck-message" />
              </LocationProvider>
              <NoResultsMessage
                v-if="showNoResultsMessage"
                class="xds:mb-16"
                data-test="no-results-message"
              />
              <FallbackDisclaimerMessage class="xds:mb-16" />
            </div>

            <div class="x-results-grid xds:flex xds:gap-24">
              <div
                v-if="!facetsPanelOverlay && x.results.length > 0"
                class="xds:flex xds:h-auto xds:flex-col xds:justify-between xds:pb-64"
              >
                <DesktopAside />
              </div>

              <LocationProvider location="results">
                <Main v-if="hasSearched" />
              </LocationProvider>
            </div>
            <PageLoaderButton
              v-if="x.query.searchBox && x.results.length > 0"
              button-classes="xds:button-outlined xds:button-lead xds:rounded-sm xds:hover:bg-accent-25 xds:text-neutral-75 xds:hover:text-neutral-75 xds:text2 xds:text2-lg xds:px-[42px] xds:py-12"
              :class="{ 'xds:hidden!': x.results.length >= x.totalResults }"
            >
              <template #textContent>
                <div></div>
              </template>
              <template #buttonContent>{{ $t('pageLoaderButton.message') }}</template>
            </PageLoaderButton>
          </div>
        </Scroll>
      </MainScroll>
    </div>
  </BaseTeleport>
  <ExperienceControls />
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import {
  BaseTeleport,
  LocationProvider,
  PageLoaderButton,
  use$x,
  useState,
} from '@empathyco/x-components'
import { ExperienceControls } from '@empathyco/x-components/experience-controls'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent, inject, ref } from 'vue'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'

const DesktopSubHeader = defineAsyncComponent(() =>
  import('../index-search').then(m => m.DesktopSubHeader),
)
const Main = defineAsyncComponent(() => import('../index-search').then(m => m.Main))
const DesktopAside = defineAsyncComponent(() => import('../index-search').then(m => m.DesktopAside))
const FallbackDisclaimerMessage = defineAsyncComponent(() =>
  import('../index-search').then(m => m.FallbackDisclaimerMessage),
)
const NoResultsMessage = defineAsyncComponent(() =>
  import('../index-search').then(m => m.NoResultsMessage),
)
const SpellcheckMessage = defineAsyncComponent(() =>
  import('../index-search').then(m => m.SpellcheckMessage),
)

const { hasSearched } = useHasSearched()
const { relatedPrompts } = useState('relatedPrompts')
const x = use$x()
const { getControlFromPath } = useExperienceControls()
const aiSearchFallback = getControlFromPath('aiSearchFallback')
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')
const showNoResultsMessage = computed(
  () => !aiSearchFallback.value && !relatedPrompts.value?.length,
)
const snippetConfig = inject<SnippetConfig>('snippetConfig')
const gridTarget = computed(() => snippetConfig?.gridTarget ?? '#maincontent')
const visibleGrid = ref(false)

x.on('UserClickedCloseX', false).subscribe(() => (visibleGrid.value = false))
x.on('EmpathizeOpened', false).subscribe(() => (visibleGrid.value = true))
// Keeping this so it works when loading from url
x.on('SearchBoxQueryChanged', false).subscribe(() => (visibleGrid.value = true))
</script>
