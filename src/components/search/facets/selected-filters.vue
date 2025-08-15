<template>
  <div class="x-flex x-items-center x-gap-8">
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :show-buttons="!isTouchable"
      button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
      scroll-container-class="desktop:x-sliding-panel-fade"
      :reset-on-content-change="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>
      <SelectedFiltersList
        class="x-flex-no-shrink x-flex x-flex-row x-flex-wrap x-gap-8 max-desktop:x-pl-16"
      >
        <template #default="{ filter }">
          <SimpleFilter
            :css-classes="['x-selected x-tag x-tag-auxiliary x-tag-outlined x-rounded-full']"
            :filter="filter"
          >
            <template #label="{ filter: simpleFilter }">
              {{ simpleFilter.label }}
              <CrossTinyIcon />
            </template>
          </SimpleFilter>
        </template>

        <template #price="{ filter }">
          <NumberRangeFilter
            :css-classes="['x-selected x-tag x-tag-auxiliary x-tag-outlined x-rounded-full']"
            :filter="filter"
          >
            <template #label="{ filter: numberRangeFilter }">
              <PriceFilterLabel :filter="numberRangeFilter" />
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
      class="x-button-lead x-button-sm x-button-outlined x-flex-none x-rounded-full x-uppercase"
      :always-visible="false"
    >
      {{ $t('selectedFilters.clear', selectedFilters.length, { count: selectedFilters.length }) }}
    </ClearFilters>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CrossTinyIcon,
  SlidingPanel,
} from '@empathyco/x-components'
import {
  ClearFilters,
  NumberRangeFilter,
  SelectedFiltersList,
  SimpleFilter,
} from '@empathyco/x-components/facets'
import { useDevice } from '../../../composables/use-device.composable'
import PriceFilterLabel from './price-filter-label.vue'

const { isDesktopOrGreater, isTouchable } = useDevice()
</script>
