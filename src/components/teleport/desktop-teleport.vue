<template>
  <div class="xds:layout-container xds:layout">
    <div class="xds:sticky xds:top-0 xds:z-1 xds:bg-neutral-0">
      <DesktopSubHeader
        data-test="sub-header"
        :has-searched="hasSearched"
        :is-full-predictive="false"
        class="xds:layout-item"
      />
    </div>

    <MainScroll :use-window="true" class="x-main-scroll xds:mb-24 xds:flex xds:flex-col">
      <Scroll id="main-scroll">
        <MaxDesktopWidthItem class="xds:z-1 xds:bg-neutral-0">
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
              <MainComponent />
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
        </MaxDesktopWidthItem>
      </Scroll>
    </MainScroll>
  </div>
</template>

<script setup lang="ts">
import { LocationProvider, PageLoaderButton, use$x, useState } from '@empathyco/x-components'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent } from 'vue'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import DesktopSubHeader from '../desktop/desktop-sub-header.vue'
import MainComponent from '../main.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'

const DesktopAside = defineAsyncComponent(() => import('../search').then(m => m.DesktopAside))
const NoResultsMessage = defineAsyncComponent(() =>
  import('../search').then(m => m.NoResultsMessage),
)
const SpellcheckMessage = defineAsyncComponent(() =>
  import('../search').then(m => m.SpellcheckMessage),
)
const FallbackDisclaimerMessage = defineAsyncComponent(() =>
  import('../search').then(m => m.FallbackDisclaimerMessage),
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
</script>
