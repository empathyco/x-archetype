<template>
  <div class="x-layout-container">
    <div class="x-sticky x-top-0 x-z-[1] x-bg-neutral-0">
      <DesktopSubHeader
        data-test="sub-header"
        :has-searched="hasSearched"
        :is-full-predictive="false"
        class="x-layout-item"
      />
    </div>

    <MainScroll :use-window="true" class="x-main-scroll x-mb-24 x-flex x-flex-col">
      <Scroll id="main-scroll">
        <MaxDesktopWidthItem class="x-z-1 x-bg-neutral-0">
          <div v-if="hasSearched">
            <LocationProvider location="results">
              <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
            </LocationProvider>
            <NoResultsMessage
              v-if="showNoResultsMessage"
              class="x-mb-16"
              data-test="no-results-message"
            />
            <FallbackDisclaimerMessage class="x-mb-16" />
          </div>

          <LocationProvider location="results">
            <MainComponent />
          </LocationProvider>
          <PageLoaderButton
            v-if="x.query.searchBox && x.results.length > 0"
            button-classes="x-button-outlined x-button-lead x-rounded-sm hover:x-bg-accent-25 x-text-neutral-75 hover:x-text-neutral-75 x-text2 x-text2-lg x-px-[42px] x-py-12"
            :class="{ '!x-hidden': x.results.length >= x.totalResults }"
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
import {
  animateTranslate,
  LocationProvider,
  PageLoaderButton,
  use$x,
  useState,
} from '@empathyco/x-components'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { computed, defineAsyncComponent, defineComponent } from 'vue'
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
    const rightAsideAnimation = animateTranslate('right')
    const { hasSearched } = useHasSearched()
    const { relatedPrompts } = useState('relatedPrompts')
    const x = use$x()
    const showNoResultsMessage = computed(() => !relatedPrompts.value?.length)

    return {
      hasSearched,
      rightAsideAnimation,
      showNoResultsMessage,
      x,
    }
  },
})
</script>

<style>
.x-layout-item > * {
  min-width: 0;
}
</style>
