<template>
  <FixedHeaderAndAsidesLayout :class="{ 'x-background--neutral-100': !!$x.query.searchBox }">
    <template #header>
      <div
        class="
          x-list__item--expand
          x-row x-row--align-start x-row--gap-04
          x-padding--top-06 x-padding--bottom-05
        "
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
          class="
            x-row__item x-row__item--span-2
            x-list x-list--horizontal x-list--justify-end x-list--wrap-reverse
          "
        >
          <CloseMainModal class="x-button-lead x-button-circle x-button-ghost">
            <CrossIcon class="x-icon--l" />
          </CloseMainModal>
        </div>
      </div>
    </template>

    <template #sub-header v-if="!$x.redirections.length">
      <LocationProvider location="no_results">
        <SpellcheckMessage class="x-margin--bottom-05" data-test="spellcheck-message" />
        <NoResultsMessage class="x-margin--bottom-05" data-test="no-results-message" />
      </LocationProvider>
      <DesktopToolbar />
    </template>

    <template #toolbar>
      <SelectedFilters
        v-if="$x.totalResults > 0 && hasSearched"
        class="x-padding--05 x-padding--right-00 x-padding--left-00"
      />
    </template>

    <template #main>
      <LocationProvider location="results">
        <Main />
      </LocationProvider>
    </template>

    <template #right-aside>
      <DesktopAside v-if="hasSearched" />
    </template>

    <template #extra-aside>
      <BaseIdModal
        key="my-history-aside"
        :animation="rightAsideAnimation"
        modalId="my-history-aside"
        class="x-layout__aside x-layout__aside--right"
      >
        <DesktopMyHistoryAside />
      </BaseIdModal>
      <MyHistoryConfirmDisableModal />
    </template>

    <template #scroll-to-top>
      <ScrollToTop />
    </template>
  </FixedHeaderAndAsidesLayout>
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
  }
</script>
