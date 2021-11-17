<template>
  <SingleColumnLayout>
    <template #header>
      <div
        class="
          x-list x-list--horizontal x-list__item--expand x-list--padding-03 x-list--align-center
        "
      >
        <Close class="x-button--ghost">
          <ArrowIcon />
        </Close>
        <SearchBox class="x-list__item--expand" />
      </div>
    </template>

    <template #sub-header>
      <div v-if="$x.relatedTags.length > 0" class="x-list x-list--padding-03">
        <RelatedTags />
      </div>
    </template>

    <template #toolbar>
      <MobileToolbar />
    </template>

    <template #predictive>
      <Empathize class="x-list x-background--neutral-100" />
    </template>

    <template #main>
      <div class="x-list x-list--padding-03">
        <div
          v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
          class="x-list x-list--padding-06 x-list--padding-bottom"
        >
          <SpellcheckMessage />
          <NoResultsMessage />
        </div>

        <Recommendations />

        <Results />

        <PartialResults />
      </div>
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

    <template #aside>
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
    ArrowIcon,
    BaseColumnPickerList,
    BaseEventsModalClose,
    BaseIdModalOpen,
    BaseScroll,
    FiltersIcon,
    SingleColumnLayout
  } from '@empathyco/x-components';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import ScrollToTop from '../scroll-to-top.vue';
  import Sort from '../sort.vue';
  import Empathize from '../predictive-layer.vue';
  import Facets from '../facets/facets.vue';
  import SelectedFilters from '../facets/selected-filters.vue';
  import NoResultsMessage from '../no-results-message.vue';
  import RelatedTags from '../related-tags.vue';
  import PartialResults from '../results/partial-results.vue';
  import Recommendations from '../results/recommendations.vue';
  import Results from '../results/results.vue';
  import SearchBox from '../search-box.vue';
  import SpellcheckMessage from '../spellcheck-message.vue';
  import MobileCloseAside from './mobile-close-aside.vue';
  import MobileOpenAside from './mobile-open-aside.vue';
  import MobileToolbar from './mobile-toolbar.vue';

  @Component({
    components: {
      ScrollToTop,
      Sort,
      SelectedFilters,
      Facets,
      MobileCloseAside,
      MobileOpenAside,
      MobileToolbar,
      ArrowIcon,
      BaseIdModalOpen,
      BaseScroll,
      Close: BaseEventsModalClose,
      ColumnPicker: BaseColumnPickerList,
      Empathize,
      FiltersIcon,
      SingleColumnLayout,
      NoResultsMessage,
      PartialResults,
      Recommendations,
      RelatedTags,
      Results,
      SearchBox,
      SpellcheckMessage
    }
  })
  export default class Mobile extends Vue {}
</script>

<style lang="scss"></style>
