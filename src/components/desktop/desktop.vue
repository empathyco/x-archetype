<template>
  <div class="x-layout-container">
    <DesktopTopSection />

    <MainScroll class="x-flex x-flex-col">
      <Scroll id="main-scroll">
        <MaxDesktopWidthItem>
          <div v-if="hasSearched">
            <LocationProvider location="results">
              <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
            </LocationProvider>
            <NoResultsMessage class="x-mb-16" data-test="no-results-message" />
            <FallbackDisclaimerMessage class="x-mb-16" />
          </div>

          <LocationProvider location="no_query">
            <PreSearchManager :max-popular-searches-to-render="5" class="x-mt-56" />
          </LocationProvider>

          <LocationProvider location="results">
            <MainComponent />
          </LocationProvider>
        </MaxDesktopWidthItem>
      </Scroll>
    </MainScroll>
    <MaxDesktopWidthItem class="x-layout-on-margin-right x-layout-overlap">
      <ScrollToTop />
    </MaxDesktopWidthItem>

    <div class="x-z-20">
      <BaseIdModal
        key="right-aside"
        :animation="rightAsideAnimation"
        modal-id="right-aside"
        content-class="x-w-512 x-ml-auto"
      >
        <DesktopAside v-if="hasSearched" />
      </BaseIdModal>

      <BaseIdModal
        key="my-history-aside"
        :animation="rightAsideAnimation"
        modal-id="my-history-aside"
        content-class="x-w-512 x-ml-auto"
      >
        <MyHistoryAside />
      </BaseIdModal>

      <MyHistoryConfirmDisableModal />
    </div>
  </div>
</template>

<script lang="ts">
import { animateTranslate, BaseIdModal, LocationProvider } from '@empathyco/x-components'
import { MainScroll, Scroll } from '@empathyco/x-components/scroll'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import MainComponent from '../main.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import PreSearchManager from '../pre-search/pre-search-manager.vue'
import ScrollToTop from '../scroll-to-top.vue'
import DesktopTopSection from './desktop-top-section.vue'

export default defineComponent({
  components: {
    DesktopTopSection,
    MaxDesktopWidthItem,
    BaseIdModal,
    MyHistoryAside,
    LocationProvider,
    MainComponent,
    MainScroll,
    MyHistoryConfirmDisableModal,
    Scroll,
    ScrollToTop,
    PreSearchManager,
    DesktopAside: defineAsyncComponent(() => import('../search').then(m => m.DesktopAside)),
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

    return {
      hasSearched,
      rightAsideAnimation,
    }
  },
})
</script>

<style>
.x-layout-item > * {
  min-width: 0;
}
</style>
