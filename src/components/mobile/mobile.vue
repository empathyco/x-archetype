<template>
  <div
    class="x-layout-container x-layout-max-width-md x-layout-min-margin-16 tablet:x-layout-min-margin-24"
  >
    <div class="x-layout-item">
      <div class="x-flex x-gap-8 x-py-16">
        <CloseMainModal class="x-button-lead x-button-circle x-button-ghost">
          <ArrowLeftIcon class="x-icon-lg" />
        </CloseMainModal>
        <SearchBox class="x-flex-1" />
      </div>
    </div>

    <div class="x-layout-expand" :class="{ 'x-layout-stack': $x.query.search }">
      <LocationProvider location="predictive_layer" class="x-z-10">
        <PredictiveLayer
          :class="{ 'x-mb-40 x-border-b x-border-neutral-10 x-pb-16': !$x.query.search }"
        />
      </LocationProvider>

      <!-- Results -->
      <div class="x-flex x-flex-col">
        <MobileSubHeader :has-searched="hasSearched" />

        <div v-if="$x.query.search" class="x-layout-item">
          <LocationProvider location="results">
            <SpellcheckMessage class="x-mb-16" data-test="spellcheck-message" />
          </LocationProvider>
          <NoResultsMessage class="x-mb-16" data-test="no-results-message" />
          <FallbackDisclaimerMessage class="x-mb-16" data-test="fallback-message" />
        </div>

        <MainScroll>
          <Scroll id="main-scroll" class="x-flex-1">
            <LocationProvider location="no_query">
              <PreSearchManager class="x-mt-16" />
            </LocationProvider>

            <LocationProvider location="results">
              <div class="x-layout-item">
                <Main />
              </div>
            </LocationProvider>
          </Scroll>
        </MainScroll>

        <div class="x-layout-item x-layout-overlap x-pointer-events-none">
          <div class="x-mb-32 x-grid x-grid-cols-12 x-gap-24">
            <MobileOpenAside
              v-if="$x.totalResults > 0"
              class="x-pointer-events-auto x-col-span-8 x-col-start-3 tablet:x-col-span-4 tablet:x-col-start-5"
            />
            <ScrollToTop class="x-button-lg x-pointer-events-auto x-col-start-11" />
          </div>
        </div>
      </div>
    </div>

    <!-- eslint-disable max-len-->
    <BaseIdModal
      :animation="filtersAsideAnimation"
      modalId="aside-modal"
      contentClass="x-mt-64 x-h-[calc(100%-64px)] x-fixed x-flex-1 x-rounded-t-lg x-bg-neutral-0 desktop:x-rounded-none desktop:x-m-0"
    >
      <MobileAside v-if="hasSearched" />
    </BaseIdModal>

    <BaseIdModal
      key="my-history-aside"
      :animation="rightAsideAnimation"
      modalId="my-history-aside"
      contentClass="x-bg-neutral-0"
      class="x-z-10"
    >
      <MyHistoryAside />
    </BaseIdModal>
    <MyHistoryConfirmDisableModal />
  </div>
</template>

<script lang="ts">
  import {
    ArrowLeftIcon,
    CloseMainModal,
    LocationProvider,
    animateTranslate,
    BaseIdModal
  } from '@empathyco/x-components';
  import { MainScroll, Scroll } from '@empathyco/x-components/scroll';
  import { defineComponent } from 'vue';
  import Main from '../main.vue';
  import PreSearchManager from '../pre-search/pre-search-manager.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import PredictiveLayer from '../predictive-layer/predictive-layer.vue';
  import SearchBox from '../search-box.vue';
  import MyHistoryAside from '../my-history/my-history-aside.vue';
  import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue';
  import MobileOpenAside from './mobile-open-aside.vue';
  import MobileSubHeader from './mobile-sub-header.vue';

  export default defineComponent({
    components: {
      ArrowLeftIcon,
      BaseIdModal,
      CloseMainModal,
      PreSearchManager,
      LocationProvider,
      MobileSubHeader,
      Main,
      MainScroll,
      MyHistoryAside,
      MobileOpenAside,
      MyHistoryConfirmDisableModal,
      PredictiveLayer,
      Scroll,
      ScrollToTop,
      SearchBox,
      MobileAside: () => import('../search').then(m => m.MobileAside),
      NoResultsMessage: () => import('../search').then(m => m.NoResultsMessage),
      SpellcheckMessage: () => import('../search').then(m => m.SpellcheckMessage),
      FallbackDisclaimerMessage: () => import('../search').then(m => m.FallbackDisclaimerMessage)
    },
    setup() {
      const filtersAsideAnimation = animateTranslate('bottom');
      const rightAsideAnimation = animateTranslate('right');

      return {
        filtersAsideAnimation,
        rightAsideAnimation
      };
    }
  });
</script>
