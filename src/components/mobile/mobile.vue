<template>
  <SingleColumnLayout :asideAnimation="animation">
    <template #header>
      <div
        class="x-list x-list--horizontal x-list__item--expand x-padding--05 x-list--align-center"
      >
        <Close class="x-button--ghost x-padding--left-00">
          <ArrowLeftIcon class="x-icon--l" />
        </Close>
        <SearchBox class="x-list__item--expand" />
      </div>
    </template>

    <template #sub-header>
      <div
        v-if="$x.relatedTags.length > 0"
        class="x-list__item--expand x-list x-padding--05 x-padding--top-00"
      >
        <LocationProvider location="predictive_layer">
          <RelatedTags />
        </LocationProvider>
      </div>
    </template>

    <template #toolbar>
      <MobileToolbar class="x-padding--05 x-padding--top-00" />
    </template>

    <template #predictive>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="x-list x-list__item--expand x-background--neutral-100 x-scroll" />
      </LocationProvider>
    </template>

    <template #main>
      <LocationProvider location="results">
        <Main class="x-list--padding-05" />
      </LocationProvider>
    </template>

    <template #floating>
      <div class="x-row x-row--padding-03 x-row--justify-center x-list__item--expand">
        <MobileOpenAside
          v-if="$x.totalResults > 0"
          class="x-row__item x-row__item--start-4 x-row__item--span-6"
        />
        <ScrollToTop class="x-row__item x-row__item--start-11 x-row__item--span-2" />
      </div>
    </template>

    <template v-if="hasSearched" #aside>
      <MobileAside />
    </template>
  </SingleColumnLayout>
</template>

<script lang="ts">
  import {
    ArrowLeftIcon,
    BaseColumnPickerList,
    BaseEventsModalClose,
    BaseIdModalOpen,
    BaseScroll,
    FiltersIcon,
    SingleColumnLayout,
    LocationProvider,
    animateTranslate
  } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import Main from '../main.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import PredictiveLayer from '../predictive-layer/predictive-layer.vue';
  import SearchBox from '../search-box.vue';
  import HasSearchedMixin from '../has-searched.mixin';
  import MobileCloseAside from './mobile-close-aside.vue';
  import MobileOpenAside from './mobile-open-aside.vue';
  import MobileToolbar from './mobile-toolbar.vue';

  @Component({
    components: {
      ArrowLeftIcon,
      BaseIdModalOpen,
      BaseScroll,
      Close: BaseEventsModalClose,
      ColumnPicker: BaseColumnPickerList,
      FiltersIcon,
      LocationProvider,
      Main,
      MobileCloseAside,
      MobileOpenAside,
      MobileToolbar,
      PredictiveLayer,
      ScrollToTop,
      SearchBox,
      SingleColumnLayout,
      MobileAside: () => import('./mobile-aside.vue'),
      RelatedTags: () => import('../search').then(m => m.RelatedTags)
    }
  })
  export default class Mobile extends HasSearchedMixin {
    public animation = animateTranslate('bottom');
  }
</script>

<style lang="scss"></style>
