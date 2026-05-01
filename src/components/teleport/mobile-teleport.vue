<template>
  <MobileLayout>
    <template #toolbar>
      <MobileSubHeader v-if="!x.noResults" :has-searched="hasSearched" />
    </template>

    <template #filters-modal>
      <MobileAside v-if="hasSearched" class="xds:z-20 xds:w-full" />
    </template>

    <template #my-history-modal>
      <MyHistoryAside />
      <MyHistoryConfirmDisableModal />
    </template>

    <template #main>
      <MainScroll :use-window="true" class="x-main-scroll xds:flex xds:flex-col">
        <Scroll id="main-scroll">
          <section v-if="x.query.search" class="x-layout-padding">
            <LocationProvider location="results">
              <SpellcheckMessage class="xds:mb-16" data-test="spellcheck-message" />
            </LocationProvider>
            <NoResultsMessage
              v-if="showNoResultsMessage"
              class="xds:mb-16"
              data-test="no-results-message"
            />
            <FallbackDisclaimerMessage class="xds:mb-16" data-test="fallback-message" />
          </section>
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
        </Scroll>
      </MainScroll>
    </template>

    <template #overlay>
      <div
        class="xds:mb-32 xds:grid xds:min-h-48 xds:w-full xds:grid-cols-12 xds:items-center xds:gap-24"
      >
        <MobileOpenAside
          v-if="x.totalResults > 0"
          class="xds:pointer-events-auto xds:col-span-8 xds:col-start-3 xds:max-h-40 xds:tablet:col-span-4 xds:tablet:col-start-5"
        />
        <ScrollToTop class="xds:pointer-events-auto xds:col-start-11 xds:button-lg" />
      </div>
    </template>
  </MobileLayout>
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
    const filtersAsideAnimation = h(AnimateTranslate, { animationOrigin: 'bottom' })
    const rightAsideAnimation = h(AnimateTranslate, { animationOrigin: 'right' })
    const { hasSearched } = useHasSearched()
    const { relatedPrompts } = useState('relatedPrompts')
    const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
    const aiSearchFallback = controls.aiSearchFallback as boolean

    const showNoResultsMessage = computed(() => !aiSearchFallback && !relatedPrompts.value?.length)

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
  padding-inline: var(--xds-layout-min-margin);
}
.x-scroll-to-top {
  justify-self: start !important;
}
</style>
