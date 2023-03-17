<template>
  <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :showButtons="!isTouchable"
      buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
      scrollContainerClass="desktop:x-sliding-panel-fade"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>
      <SelectedFiltersList
        class="x-list x-flex-no-shrink x-list--wrap x-list--gap-03"
        :class="{ 'x-padding--left-05': isTabletOrLess }"
      >
        <template #default="{ filter }">
          <SimpleFilter
            class="x-tag x-tag--pill x-tag--ghost x-background--auxiliary x-padding--04 x-padding--top-03 x-padding--bottom-03 x-text-auxiliary-50"
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
            class="x-tag x-tag--pill x-tag--ghost x-background--auxiliary x-padding--04 x-padding--top-03 x-padding--bottom-03 x-text-auxiliary-50"
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
        <ChevronRightIcon class="x-icon-lg" />
      </template>
    </SlidingPanel>

    <ClearFilters
      v-if="isDesktopOrGreater"
      v-slot="{ selectedFilters }"
      data-test="clear-filters-toolbar"
      class="x-border-radius--20 x-list__item--flex-none x-button-lead x-button-sm x-button-outlined"
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

<style lang="scss" scoped>
  .x-clear-filters {
    --x-size-height-button-default: auto;
  }
</style>
