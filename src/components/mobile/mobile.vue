<template>
  <SingleColumnLayout>
    <template #header>
      <div
        class="
          x-list x-list--horizontal x-list__item--expand x-list--padding-03 x-list--align-center
        "
      >
        <Close class="x-button--ghost">
          <ArrowLeftIcon />
        </Close>
        <SearchBox class="x-list__item--expand" />
      </div>
    </template>

    <template #sub-header>
      <div v-if="$x.relatedTags.length > 0" class="x-list x-list--padding-03">
        <LocationProvider location="predictive_layer">
          <RelatedTags />
        </LocationProvider>
      </div>
    </template>

    <template #toolbar>
      <MobileToolbar />
    </template>

    <template #predictive>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer class="x-list x-background--neutral-100" />
      </LocationProvider>
    </template>

    <template #main>
      <LocationProvider location="results">
        <Main />
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
      <div
        v-if="$x.totalResults > 0"
        class="
          x-list
          x-list--vertical
          x-list__item--expand
          x-list--padding-03
          x-list--padding-left
          x-list--padding-right
        "
      >
        <BaseScroll class="x-list__item--expand">
          <Sort class="x-list--padding-04 x-list--padding-bottom" />
          <Facets class="x-list--gap-06 x-list--padding-04 x-list--padding-bottom" />
        </BaseScroll>
        <SelectedFilters
          v-if="$x.selectedFilters.length"
          class="x-list x-list--gap-05 x-list--padding-04 x-list--padding-bottom"
        />
        <div class="x-list x-list--padding-03 x-list--padding-bottom">
          <MobileCloseAside />
        </div>
      </div>
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
    LocationProvider
  } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import Main from '../main.vue';
  import ScrollToTop from '../scroll-to-top.vue';
  import PredictiveLayer from '../predictive-layer.vue';
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
      Sort: () => import('../search').then(m => m.Sort),
      RelatedTags: () => import('../search').then(m => m.RelatedTags),
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters),
      Facets: () => import('../search').then(m => m.Facets)
    }
  })
  export default class Mobile extends HasSearchedMixin {}
</script>

<style lang="scss"></style>
