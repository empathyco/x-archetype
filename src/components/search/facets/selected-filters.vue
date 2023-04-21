<template>
  <div class="x-flex x-items-center x-gap-8">
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :showButtons="!isTouchable"
      buttonClass="x-button-lead x-button-circle x-button-ghost x-p-0"
      scrollContainerClass="desktop:x-sliding-panel-fade"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>
      <SelectedFiltersList
        class="x-flex-no-shrink x-flex x-flex-row x-flex-wrap x-gap-8 max-desktop:x-pl-16"
      >
        <template #default="{ filter }">
          <SimpleFilter
            class="x-tag x-tag-auxiliary x-tag-outlined x-selected x-rounded-full"
            :filter="filter"
          >
            <template #label="{ filter }">
              {{ filter.label }}
              <CrossTinyIcon />
            </template>
          </SimpleFilter>
        </template>

        <template #price="{ filter }">
          <NumberRangeFilter
            class="x-tag x-tag-auxiliary x-tag-outlined x-selected x-rounded-full"
            :filter="filter"
          >
            <template #label="{ filter }">
              <PriceFilterLabel :filter="filter" />
              <CrossTinyIcon />
            </template>
          </NumberRangeFilter>
        </template>
      </SelectedFiltersList>
      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon-lg" />
      </template>
    </SlidingPanel>

    <ClearFilters
      v-if="isDesktopOrGreater"
      v-slot="{ selectedFilters }"
      data-test="clear-filters-toolbar"
      class="x-button-lead x-button-sm x-button-outlined x-flex-none x-rounded-full"
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
  import { defineComponent } from 'vue';
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CrossTinyIcon,
    SlidingPanel
  } from '@empathyco/x-components';
  import { useDevice } from '../../../composables/use-device.composable';
  import PriceFilterLabel from './price-filter-label.vue';

  export default defineComponent({
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
    },
    setup() {
      const { isTabletOrLess, isDesktopOrGreater, isTouchable } = useDevice();
      return {
        isTabletOrLess,
        isDesktopOrGreater,
        isTouchable
      };
    }
  });
</script>
