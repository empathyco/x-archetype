<template>
  <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :showButtons="$x.device === 'mobile' ? false : true"
      buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
      :scrollContainerClass="scrollContainerClasses"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon--l" />
      </template>
      <SelectedFiltersList
        class="x-list x-list--wrap x-list--gap-03"
        :class="{ 'x-padding--left-05': $x.device === 'mobile' }"
      >
        <template #default="{ filter }">
          <SimpleFilter
            class="
              x-tag x-tag--pill x-tag--ghost
              x-background--auxiliary
              x-padding--04 x-padding--top-03 x-padding--bottom-03
              x-text-auxiliary-50
            "
            :filter="filter"
          >
            <template #label="{ filter }">
              <span class="x-title4">{{ filter.label }}</span>
              <CrossTinyIcon />
            </template>
          </SimpleFilter>
        </template>

        <template #price="{ filter }">
          <NumberRangeFilter
            class="
              x-tag x-tag--pill x-tag--ghost
              x-background--auxiliary
              x-padding--04 x-padding--top-03 x-padding--bottom-03
              x-text-auxiliary-50
            "
            :filter="filter"
          >
            <template #label="{ filter }">
              <PriceFilterLabel class="x-title4" :filter="filter" />
              <CrossTinyIcon />
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
      data-test="clear-filters-toolbar"
      class="
        x-button-sm x-button-lead x-button-outlined
        x-border-radius--20
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
  export default class SelectedFiltersComponent extends Vue {
    protected get scrollContainerClasses(): string {
      return this.$x.device !== 'mobile' ? 'x-sliding-panel-fade' : '';
    }
  }
</script>

<style lang="scss" scoped>
  .x-clear-filters {
    --x-size-height-button-default: auto;
  }
</style>
