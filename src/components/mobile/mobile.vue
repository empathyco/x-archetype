<template>
  <SingleColumnLayout
    :asideAnimation="animation"
    :class="{ 'x-background--neutral-100': !!$x.query.searchBox }"
  >
    <template #header>
      <div
        class="
          x-list x-list--horizontal x-list__item--expand
          x-padding--05
          x-list--align-center
          x-background--neutral-100
        "
      >
        <CloseMainModal
          class="x-button--ghost x-padding--left-00"
          :class="{ 'x-padding--right-03': $x.device === 'mobile' }"
        >
          <ArrowLeftIcon class="x-icon--l" />
        </CloseMainModal>
        <SearchBox class="x-list__item--expand" />
      </div>
    </template>

    <template #sub-header>
      <div
        v-if="$x.relatedTags.length > 0"
        class="x-list__item--expand x-list x-padding--00 x-padding--bottom-05"
      >
        <LocationProvider location="predictive_layer">
          <RelatedTags />
        </LocationProvider>
      </div>
    </template>

    <template #toolbar v-if="$x.query.search">
      <MobileToolbar class="x-padding--left-05 x-padding--bottom-05 x-padding--right-03" />
    </template>

    <template #predictive>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="x-list x-list__item--expand x-background--neutral-100 x-scroll" />
      </LocationProvider>
    </template>

    <template #main>
      <LocationProvider location="results">
        <Main />
      </LocationProvider>
    </template>

    <template #floating>
      <div class="x-row x-row--padding-03 x-list__item--expand x-margin--bottom-06">
        <MobileOpenAside
          v-if="$x.totalResults > 0"
          class="x-row__item x-row__item--start-4 x-row__item--span-6"
        />
        <div class="x-row__item--start-11 x-row__item--span-2 x-row__item x-padding--00">
          <ScrollToTop class="x-row__item" />
        </div>
      </div>
    </template>

    <template v-if="hasSearched" #aside>
      <MobileAside />
    </template>

    <template #extra-aside>
      <BaseIdModal
        key="my-history-aside"
        :animation="rightAsideAnimation"
        modalId="my-history-aside"
        class="x-layout__aside x-layout__aside--extra"
      >
        <MobileMyHistoryAside />
      </BaseIdModal>
      <MyHistoryConfirmDisableModal class="x-layout__aside--extra x-background--transparent" />
    </template>
  </SingleColumnLayout>
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
      MobileCloseAside,
      MobileOpenAside,
      MobileMyHistoryAside,
      MobileToolbar,
      PredictiveLayer,
      ScrollToTop,
      SearchBox,
      SingleColumnLayout,
      MobileAside: () => import('../search').then(m => m.MobileAside),
      RelatedTags: () => import('../search').then(m => m.RelatedTags)
    }
  })
  export default class Mobile extends HasSearchedMixin {
    public animation = animateTranslate('bottom');
    public rightAsideAnimation = animateTranslate('right');
  }
</script>
<style lang="scss">
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
