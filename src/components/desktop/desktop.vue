<template>
  <div
    class="x-layout-container x-layout-max-width-md x-layout-min-margin-16 tablet:x-layout-min-margin-24 desktop:x-layout-min-margin-32 large:x-layout-max-width-lg large:x-layout-min-margin-48"
  >
    <MainScroll>
      <Scroll @scroll="setPosition" id="main-scroll">
        <div class="x-layout-item">
          <div
            class="x-list__item--expand x-row x-row--align-start x-row--gap-04 x-padding--top-06 x-padding--bottom-05"
          >
            <div class="x-row__item x-row__item--span-2 x-list x-padding--top-04">
              <Logo />
            </div>

            <div class="x-row__item x-row__item--span-8 x-list x-list--vertical x-list--gap-05">
              <div class="x-relative">
                <SearchBox />
                <LocationProvider location="predictive_layer">
                  <PredictiveLayer class="x-absolute x-background--neutral-100 x-shadow--04" />
                </LocationProvider>
              </div>
              <LocationProvider location="predictive_layer">
                <RelatedTags v-if="$x.relatedTags.length > 0" />
              </LocationProvider>
            </div>

            <div
              class="x-row__item x-row__item--span-2 x-list x-list--horizontal x-list--justify-end x-list--wrap-reverse"
            >
              <CloseMainModal class="x-button-lead x-button-circle x-button-ghost">
                <CrossIcon class="x-icon-lg" />
              </CloseMainModal>
            </div>
          </div>
        </div>

        <div v-if="!$x.redirections.length && hasSearched" class="x-layout-item">
          <LocationProvider location="results">
            <SpellcheckMessage class="x-margin--bottom-05" data-test="spellcheck-message" />
          </LocationProvider>
          <NoResultsMessage class="x-margin--bottom-05" data-test="no-results-message" />
          <DesktopToolbar />
        </div>

        <div v-if="$x.totalResults > 0 && hasSearched" class="x-layout-item">
          <SelectedFilters class="x-padding--05 x-padding--right-00 x-padding--left-00" />
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
          class="x-layout__aside x-layout__aside--right"
        >
          <DesktopAside />
        </BaseIdModal>

        <BaseIdModal
          key="my-history-aside"
          :animation="rightAsideAnimation"
          modalId="my-history-aside"
          class="x-layout__aside x-layout__aside--right"
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
    BaseVariableColumnGrid,
    CartIcon,
    CrossIcon,
    CrossTinyIcon,
    FixedHeaderAndAsidesLayout,
    LocationProvider,
    PlusIcon,
    SlidingPanel
  } from '@empathyco/x-components';
  import { Empathize } from '@empathyco/x-components/empathize';
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
      MyHistoryConfirmDisableModal,
      BaseVariableColumnGrid,
      BaseIdModal,
      CartIcon,
      CloseMainModal,
      CrossIcon,
      CrossTinyIcon,
      DesktopToolbar,
      DesktopMyHistoryAside,
      Empathize,
      FixedHeaderAndAsidesLayout,
      LocationProvider,
      Logo,
      Main,
      PlusIcon,
      PredictiveLayer,
      ScrollToTop,
      SearchBox,
      MainScroll,
      Scroll,
      SlidingPanel,
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters),
      DesktopAside: () => import('../search').then(m => m.DesktopAside),
      NoResultsMessage: () => import('../search').then(m => m.NoResultsMessage),
      SpellcheckMessage: () => import('../search').then(m => m.SpellcheckMessage)
    }
  })
  export default class Desktop extends HasSearchedMixin {
    protected rightAsideAnimation = animateTranslate('right');
    protected scrollPosition = 0;

    protected setPosition(position: number): void {
      this.scrollPosition = position;
    }

    protected get isBackdropVisible(): boolean {
      return this.scrollPosition > 0;
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .x-layout__aside {
    .x-modal__content {
      background-color: transparent;
      height: 100%;
      width: var(--x-size-width-layout-aside, 300px);
    }
    &.x-modal {
      // layout
      z-index: 3;
      flex-flow: row nowrap;
    }

    // others
    pointer-events: none;
    > *:not(.slot-helper) {
      pointer-events: all;
    }

    &--right.x-modal {
      justify-content: flex-end;
    }
  }
</style>
