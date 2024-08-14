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
            <PreSearchManager :maxPopularSearchesToRender="5" class="x-mt-56" />
          </LocationProvider>

          <LocationProvider location="results">
            <Main />
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
        modalId="right-aside"
        contentClass="x-w-512 x-ml-auto"
      >
        <DesktopAside v-if="hasSearched" />
      </BaseIdModal>

      <BaseIdModal
        key="my-history-aside"
        :animation="rightAsideAnimation"
        modalId="my-history-aside"
        contentClass="x-w-512 x-ml-auto"
      >
        <MyHistoryAside />
      </BaseIdModal>

      <MyHistoryConfirmDisableModal />
    </div>
  </div>
</template>

<script lang="ts">
  import { animateTranslate, BaseIdModal, LocationProvider } from '@empathyco/x-components';
  import { MainScroll, Scroll } from '@empathyco/x-components/scroll';
  import { defineComponent } from 'vue';
  import Main from '../main.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import HasSearchedMixin from '../has-searched.mixin';
  import MyHistoryAside from '../my-history/my-history-aside.vue';
  import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue';
  import MaxDesktopWidthItem from '../max-desktop-width-item.vue';
  import PreSearchManager from '../pre-search/pre-search-manager.vue';
  import DesktopTopSection from './desktop-top-section.vue';

  export default defineComponent({
    name: 'Desktop',
    components: {
      DesktopTopSection,
      MaxDesktopWidthItem,
      BaseIdModal,
      MyHistoryAside,
      LocationProvider,
      Main,
      MainScroll,
      MyHistoryConfirmDisableModal,
      Scroll,
      ScrollToTop,
      PreSearchManager,
      DesktopAside: () => import('../search').then(m => m.DesktopAside),
      NoResultsMessage: () => import('../search').then(m => m.NoResultsMessage),
      SpellcheckMessage: () => import('../search').then(m => m.SpellcheckMessage),
      FallbackDisclaimerMessage: () => import('../search').then(m => m.FallbackDisclaimerMessage)
    },
    mixins: [HasSearchedMixin],
    setup() {
      const rightAsideAnimation = animateTranslate('right');

      return { rightAsideAnimation };
    }
  });
</script>

<style>
  .x-layout-item > * {
    min-width: 0;
  }
</style>
