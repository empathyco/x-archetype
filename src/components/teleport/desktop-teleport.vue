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

          <LocationProvider location="results">
            <MainComponent />
          </LocationProvider>
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

<script lang="ts">
import type { Dictionary } from '@empathyco/x-utils'
import {
  AnimateTranslate,
  LocationProvider,
  PageLoaderButton,
  use$x,
  useState,
} from '@empathyco/x-components'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent, defineComponent, h } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import DesktopSubHeader from '../desktop/desktop-sub-header.vue'
import MainComponent from '../main.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'

export default defineComponent({
  components: {
    PageLoaderButton,
    DesktopSubHeader,
    MaxDesktopWidthItem,
    LocationProvider,
    MainScroll,
    Scroll,
    MainComponent,
    NoResultsMessage: defineAsyncComponent(() => import('../search').then(m => m.NoResultsMessage)),
    SpellcheckMessage: defineAsyncComponent(() =>
      import('../search').then(m => m.SpellcheckMessage),
    ),
    FallbackDisclaimerMessage: defineAsyncComponent(() =>
      import('../search').then(m => m.FallbackDisclaimerMessage),
    ),
  },
  setup() {
    const rightAsideAnimation = h(AnimateTranslate, { animationOrigin: 'right' })
    const { hasSearched } = useHasSearched()
    const { relatedPrompts } = useState('relatedPrompts')
    const x = use$x()
    const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
    const aiSearchFallback = controls.aiSearchFallback as boolean
    const showNoResultsMessage = computed(() => !aiSearchFallback && !relatedPrompts.value?.length)

    return {
      hasSearched,
      rightAsideAnimation,
      showNoResultsMessage,
      x,
    }
  },
})
</script>
