<template>
  <div class="x-list x-list--horizontal x-list--align-center">
    <SlidingPanel
      class="x-sliding-panel--show-buttons-on-hover"
      :showButtons="$x.device === 'mobile' ? false : true"
      :buttonClass="'x-button--ghost x-padding--00'"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon--l" />
      </template>
      <SelectedFiltersList class="x-list x-list--wrap x-list--gap-03 x-padding--left-05">
        <template #default="{ filter }">
          <SimpleFilter
            class="
              x-tag x-tag--pill x-tag--ghost
              x-background--auxiliary
              x-padding--04 x-padding--top-03 x-padding--bottom-03
            "
            :filter="filter"
          >
            <template #label="{ filter }">
              <span class="x-text x-text--bold x-font-color--accent">{{ filter.label }}</span>
              <CrossTinyIcon class="x-font-color--accent" />
            </template>
          </SimpleFilter>
        </template>

        <template #price="{ filter }">
          <NumberRangeFilter
            class="
              x-tag x-tag--pill x-tag--ghost
              x-background--auxiliary
              x-padding--04 x-padding--top-03 x-padding--bottom-03
            "
            :filter="filter"
          >
            <template #label="{ filter }">
              <PriceFilterLabel class="x-text x-text--bold x-font-color--accent" :filter="filter" />
              <CrossTinyIcon class="x-font-color--accent" />
            </template>
          </NumberRangeFilter>
        </template>
      </SelectedFiltersList>
      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon--l" />
      </template>
    </SlidingPanel>

    <ClearFilters
      v-if="$x.device === 'desktop'"
      v-slot="{ selectedFilters }"
      class="
        x-button--secondary x-button--round
        x-padding--05 x-padding--top-03 x-padding--bottom-03
        x-margin--left-03
        x-list__item--flex-none
      "
      :alwaysVisible="false"
    >
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>
  </div>
</template>

<script lang="ts">
  import {
    ClearFilters,
    NumberRangeFilter,
    SelectedFiltersList,
    SimpleFilter
  } from '@empathyco/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CrossTinyIcon,
    SlidingPanel
  } from '@empathyco/x-components';
  import PriceFilterLabel from './price-filter-label.vue';

  @Component({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      CrossTinyIcon,
      ClearFilters,
      NumberRangeFilter,
      PriceFilterLabel,
      SelectedFiltersList,
      SlidingPanel,
      SimpleFilter
    }
  })
  export default class SelectedFiltersComponent extends Vue {}
</script>

<style lang="scss" scoped>
  .x-clear-filters {
    --x-size-height-button-default: auto;
  }
</style>
