<template>
  <div
    class="x-layout-container x-layout-max-width-md x-layout-min-margin-16 tablet:x-layout-min-margin-24 desktop:x-layout-min-margin-32 large:x-layout-max-width-lg large:x-layout-min-margin-48"
  >
    <div class="x-layout-item">
      <header class="x-align-start x-grid x-grid-cols-6 x-gap-12 x-pt-24 x-pb-16">
        <div class="x-list x-pt-12">
          <Logo />
        </div>

        <div class="x-col-span-4 x-flex x-flex-col x-gap-16">
          <div class="x-relative">
            <SearchBox />
            <LocationProvider location="predictive_layer">
              <PredictiveLayer class="x-absolute x-shadow--04" />
            </LocationProvider>
          </div>
          <LocationProvider location="predictive_layer">
            <RelatedTags v-if="$x.relatedTags.length > 0" />
          </LocationProvider>
        </div>

        <div class="x-flex x-flex-row x-justify-end">
          <CloseMainModal class="x-button-lead x-button-circle x-button-ghost">
            <CrossIcon class="x-icon-lg" />
          </CloseMainModal>
        </div>
      </header>
    </div>

    <MainScroll>
      <Scroll id="main-scroll">
        <div v-if="!$x.redirections.length && hasSearched" class="x-layout-item">
          <LocationProvider location="results">
            <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
          </LocationProvider>
          <NoResultsMessage class="x-mb-16" data-test="no-results-message" />
          <DesktopToolbar />
        </div>

        <div v-if="$x.totalResults > 0 && hasSearched" class="x-layout-item">
          <SelectedFilters class="x-py-16" />
        </div>

        <div class="x-layout-item">
          <LocationProvider location="results">
            <Main />
          </LocationProvider>
        </div>

        <BaseIdModal
          key="right-aside"
          :animation="rightAsideAnimation"
          modalId="right-aside"
          contentClass="x-w-344 x-ml-auto"
        >
          <DesktopAside />
        </BaseIdModal>

        <BaseIdModal
          key="my-history-aside"
          :animation="rightAsideAnimation"
          modalId="my-history-aside"
          contentClass="x-w-344 x-ml-auto"
        >
          <DesktopMyHistoryAside />
        </BaseIdModal>
        <MyHistoryConfirmDisableModal />
      </Scroll>
    </MainScroll>
    <div class="x-layout-on-margin-right x-layout-overlap x-layout-item">
      <ScrollToTop />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    animateTranslate,
    CloseMainModal,
    BaseIdModal,
    CrossIcon,
    FixedHeaderAndAsidesLayout,
    LocationProvider
  } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import { MainScroll, Scroll } from '@empathyco/x-components/scroll';
  import Logo from '../logo.vue';
  import Main from '../main.vue';
  import PredictiveLayer from '../predictive-layer/predictive-layer.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import SearchBox from '../search-box.vue';
  import HasSearchedMixin from '../has-searched.mixin';
  import DesktopMyHistoryAside from '../my-history/desktop-my-history-aside.vue';
  import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue';
  import DesktopToolbar from './desktop-toolbar.vue';

  @Component({
    components: {
      BaseIdModal,
      CloseMainModal,
      CrossIcon,
      DesktopMyHistoryAside,
      DesktopToolbar,
      FixedHeaderAndAsidesLayout,
      LocationProvider,
      Logo,
      Main,
      MainScroll,
      MyHistoryConfirmDisableModal,
      PredictiveLayer,
      Scroll,
      ScrollToTop,
      SearchBox,
      DesktopAside: () => import('../search').then(m => m.DesktopAside),
      NoResultsMessage: () => import('../search').then(m => m.NoResultsMessage),
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
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
