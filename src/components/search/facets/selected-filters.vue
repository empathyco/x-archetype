<template>
  <div class="xds:flex xds:items-center xds:gap-8">
    <SlidingPanel
      class="xds:sliding-panel-show-buttons-on-hover"
      :show-buttons="!isTouchable"
      button-class="xds:button xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
      scroll-container-class="xds:dektop:sliding-panel-fade"
      :reset-on-content-change="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="xds:icon-lg" />
      </template>
      <SelectedFiltersList
        class="xds:flex-no-shrink xds:flex xds:flex-row xds:flex-wrap xds:gap-8 xds:max-desktop:pl-16"
      >
        <template #default="{ filter }">
          <SimpleFilter
            :css-classes="[
              'xds:selected xds:tag xds:tag-auxiliary xds:tag-outlined xds:rounded-full xds:grid',
            ]"
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
            :css-classes="[
              'xds:selected xds:tag xds:tag-auxiliary xds:tag-outlined xds:rounded-full',
            ]"
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
        <ChevronRightIcon class="xds:icon-lg" />
      </template>
    </SlidingPanel>

    <ClearFilters
      v-if="isDesktopOrGreater"
      v-slot="{ selectedFilters }"
      data-test="clear-filters-toolbar"
      class="xds:button xds:button-sm xds:flex-none xds:button-outlined xds:rounded-full xds:button-lead xds:uppercase"
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
