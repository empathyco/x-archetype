<template>
  <MobileLayout>
    <template #toolbar>
      <MobileSubHeader v-if="!x.noResults" :has-searched="hasSearched" />
    </template>

    <template #filters-modal>
      <MobileAside v-if="hasSearched" class="x-z-20 x-w-full" />
    </template>

    <template #my-history-modal>
      <MyHistoryAside />
      <MyHistoryConfirmDisableModal />
    </template>

    <template #main>
      <MainScroll :use-window="true" class="x-main-scroll x-flex x-flex-col">
        <Scroll id="main-scroll">
          <section v-if="x.query.search" class="x-layout-padding">
            <LocationProvider location="results">
              <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
            </LocationProvider>
            <NoResultsMessage
              v-if="showNoResultsMessage"
              class="x-mb-16"
              data-test="no-results-message"
            />
            <FallbackDisclaimerMessage class="x-mb-16" data-test="fallback-message" />
          </section>
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
        </Scroll>
      </MainScroll>
    </template>

    <template #overlay>
      <div class="x-mb-32 x-grid x-min-h-48 x-w-full x-grid-cols-12 x-items-center x-gap-24">
        <MobileOpenAside
          v-if="x.totalResults > 0"
          class="x-pointer-events-auto x-col-span-8 x-col-start-3 x-max-h-[40px] tablet:x-col-span-4 tablet:x-col-start-5"
        />
        <ScrollToTop class="x-button-lg x-pointer-events-auto x-col-start-11" />
      </div>
    </template>
  </MobileLayout>
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
import MainComponent from '../main.vue'
import MobileLayout from '../mobile/mobile-layout.vue'
import MobileOpenAside from '../mobile/mobile-open-aside.vue'
import MobileSubHeader from '../mobile/mobile-sub-header.vue'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import ScrollToTop from '../scroll-to-top.vue'

export default defineComponent({
  components: {
    PageLoaderButton,
    ScrollToTop,
    MobileOpenAside,
    MobileLayout,
    LocationProvider,
    MobileSubHeader,
    MainComponent,
    MyHistoryAside,
    MainScroll,
    Scroll,
    MyHistoryConfirmDisableModal,
    MobileAside: defineAsyncComponent(() => import('../search').then(m => m.MobileAside)),
    NoResultsMessage: defineAsyncComponent(() => import('../search').then(m => m.NoResultsMessage)),
    SpellcheckMessage: defineAsyncComponent(() =>
      import('../search').then(m => m.SpellcheckMessage),
    ),
    FallbackDisclaimerMessage: defineAsyncComponent(() =>
      import('../search').then(m => m.FallbackDisclaimerMessage),
    ),
  },
  setup() {
    const filtersAsideAnimation = animateTranslate('bottom')
    const rightAsideAnimation = animateTranslate('right')
    const { hasSearched } = useHasSearched()
    const { relatedPrompts } = useState('relatedPrompts')

    const showNoResultsMessage = computed(() => !relatedPrompts.value?.length)

    return {
      filtersAsideAnimation,
      rightAsideAnimation,
      hasSearched,
      x: use$x(),
      showNoResultsMessage,
    }
  },
})
</script>

<style scoped>
.x-layout-padding {
  padding-inline: var(--x-layout-min-margin);
}
.x-scroll-to-top {
  justify-self: start !important;
}
</style>
