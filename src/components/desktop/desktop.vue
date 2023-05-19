<template>
  <div class="x-layout-container">
    <DesktopHeaderFullPredictive />

    <MainScroll class="x-flex x-flex-col">
      <Scroll id="main-scroll">
        <div class="desktop-width-item">
          <div v-if="!$x.redirections.length && hasSearched">
            <LocationProvider location="results">
              <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
            </LocationProvider>
            <NoResultsMessage class="x-mb-16" data-test="no-results-message" />
            <DesktopToolbar />
          </div>

          <SelectedFilters
            v-if="$x.totalResults > 0 && hasSearched && $x.selectedFilters.length"
            class="x-py-16"
          />

          <LocationProvider location="no_query">
            <CustomQueryPreview class="x-mt-56" />
          </LocationProvider>

          <LocationProvider location="results">
            <Main />
          </LocationProvider>
        </div>
      </Scroll>
    </MainScroll>
    <div class="desktop-width-item x-layout-on-margin-right x-layout-overlap">
      <ScrollToTop />
    </div>

    <div class="x-z-20">
      <BaseIdModal
        key="right-aside"
        :animation="rightAsideAnimation"
        modalId="right-aside"
        contentClass="x-w-512 x-ml-auto"
      >
        <DesktopAside />
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
  import { Component } from 'vue-property-decorator';
  import { MainScroll, Scroll } from '@empathyco/x-components/scroll';
  import Main from '../main.vue';
  import CustomQueryPreview from '../pre-search/custom-query-preview.vue';
  import PredictiveLayer from '../predictive-layer/predictive-layer.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import HasSearchedMixin from '../has-searched.mixin';
  import MyHistoryAside from '../my-history/my-history-aside.vue';
  import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue';
  import DesktopToolbar from './desktop-toolbar.vue';
  import DesktopHeaderFloatingPredictive from './desktop-header-floating-predictive.vue';
  import DesktopHeaderFullPredictive from './desktop-header-full-predictive.vue';

  @Component({
    components: {
      DesktopHeaderFullPredictive,
      DesktopHeaderFloatingPredictive,
      CustomQueryPreview,
      BaseIdModal,
      MyHistoryAside,
      DesktopToolbar,
      LocationProvider,
      Main,
      MainScroll,
      MyHistoryConfirmDisableModal,
      PredictiveLayer,
      Scroll,
      ScrollToTop,
      DesktopAside: () => import('../search').then(m => m.DesktopAside),
      NoResultsMessage: () => import('../search').then(m => m.NoResultsMessage),
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters),
      SpellcheckMessage: () => import('../search').then(m => m.SpellcheckMessage)
    }
  })
  export default class Desktop extends HasSearchedMixin {
    protected rightAsideAnimation = animateTranslate('right');
  }
</script>

<style>
  .x-layout-item > * {
    min-width: 0;
  }
</style>
