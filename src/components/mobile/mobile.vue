<template>
  <div class="x-layout-container x-layout-max-width-md x-layout-min-margin-16">
    <div class="x-layout-item">
      <div
        class="x-list x-list--horizontal x-list__item--expand x-list--align-center x-background--neutral-100 x-py-16"
      >
        <CloseMainModal class="x-button-lead x-button-circle x-button-ghost">
          <ArrowLeftIcon class="x-icon-lg" />
        </CloseMainModal>
        <SearchBox class="x-list__item--expand" />
      </div>
    </div>

    <div class="x-stack">
      <!--      Results-->
      <div v-if="!$x.isEmpathizeOpen" class="x-flex x-min-h-0 x-flex-col">
        <div v-if="$x.relatedTags.length > 0" class="x-layout-no-margin x-layout-item">
          <div class="x-list__item--expand x-list x-padding--00 x-padding--bottom-05">
            <LocationProvider location="predictive_layer">
              <RelatedTags />
            </LocationProvider>
          </div>
        </div>

        <div
          v-if="$x.query.search && !$x.redirections.length"
          class="x-layout-no-margin x-layout-item"
        >
          <div class="x-flex-1">
            <LocationProvider location="results">
              <SpellcheckMessage
                class="x-margin--bottom-05 x-margin--left-05 x-margin--right-03"
                data-test="spellcheck-message"
              />
            </LocationProvider>
            <NoResultsMessage
              class="x-margin--bottom-05 x-margin--left-05 x-margin--right-03"
              data-test="no-results-message"
            />
            <MobileToolbar class="x-padding--left-05 x-padding--bottom-05 x-padding--right-03" />
          </div>
        </div>

        <MainScroll>
          <Scroll id="main-scroll">
            <LocationProvider location="results">
              <div class="x-layout-item">
                <Main />
              </div>
            </LocationProvider>
          </Scroll>
        </MainScroll>

        <div class="x-layout-overlap x-layout-item">
          <div class="x-row x-row--padding-03 x-list__item--expand x-margin--bottom-06">
            <MobileOpenAside
              v-if="$x.totalResults > 0"
              class="x-row__item x-row__item--start-4 x-row__item--span-6"
            />
            <div class="x-row__item--start-11 x-row__item--span-2 x-row__item x-padding--00">
              <ScrollToTop class="x-row__item" />
            </div>
          </div>
        </div>
      </div>

      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="x-background--neutral-100 x-layout-item" />
      </LocationProvider>
    </div>

    <BaseIdModal :animation="rightAsideAnimation" modalId="aside-modal" class="x-layout__aside">
      <MobileAside />
    </BaseIdModal>

    <BaseIdModal
      key="my-history-aside"
      :animation="rightAsideAnimation"
      modalId="my-history-aside"
      class="x-layout__aside x-layout__aside--extra"
    >
      <MobileMyHistoryAside />
    </BaseIdModal>
    <MyHistoryConfirmDisableModal class="x-layout__aside--extra x-background--transparent" />
  </div>
</template>

<script lang="ts">
  import {
    ArrowLeftIcon,
    BaseColumnPickerList,
    CloseMainModal,
    BaseIdModalOpen,
    BaseScroll,
    FiltersIcon,
    SingleColumnLayout,
    LocationProvider,
    animateTranslate,
    BaseIdModal
  } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import { MainScroll, Scroll } from '@empathyco/x-components/scroll';
  import Main from '../main.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import PredictiveLayer from '../predictive-layer/predictive-layer.vue';
  import SearchBox from '../search-box.vue';
  import HasSearchedMixin from '../has-searched.mixin';
  import MobileMyHistoryAside from '../my-history/mobile-my-history-aside.vue';
  import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue';
  import MobileCloseAside from './mobile-close-aside.vue';
  import MobileOpenAside from './mobile-open-aside.vue';
  import MobileToolbar from './mobile-toolbar.vue';

  @Component({
    components: {
      MyHistoryConfirmDisableModal,
      ArrowLeftIcon,
      BaseIdModal,
      BaseIdModalOpen,
      BaseScroll,
      CloseMainModal,
      ColumnPicker: BaseColumnPickerList,
      FiltersIcon,
      LocationProvider,
      Main,
      MainScroll,
      MobileCloseAside,
      MobileOpenAside,
      MobileMyHistoryAside,
      MobileToolbar,
      PredictiveLayer,
      Scroll,
      ScrollToTop,
      SearchBox,
      SingleColumnLayout,
      MobileAside: () => import('../search').then(m => m.MobileAside),
      NoResultsMessage: () => import('../search').then(m => m.NoResultsMessage),
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
      SpellcheckMessage: () => import('../search').then(m => m.SpellcheckMessage)
    }
  })
  export default class Mobile extends HasSearchedMixin {
    public animation = animateTranslate('bottom');
    public rightAsideAnimation = animateTranslate('right');
  }
</script>
<style lang="scss">
  .x-stack {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    overflow: hidden;
    & > * {
      grid-row: 1;
      grid-column: 1;
    }
  }
  .x-mobile {
    .x-modal {
      &.x-layout__aside:not(.x-layout__aside--extra) {
        .x-modal__content {
          height: calc(100% - 64px) !important;
          top: 64px;
          position: fixed;
          border-top-right-radius: 16px;
          border-top-left-radius: 16px;
        }
      }
    }

    .x-layout__aside:not(.x-background--transparent) {
      .x-modal__content {
        background-color: var(--x-color-base-neutral-100) !important;
      }
    }
  }
</style>
