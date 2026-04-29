<template>
  <Facets>
    <template #default="{ facet }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="xds:border-0 xds:border-t xds:border-neutral-10"
      >
        <template #header>
          <span class="xds:title3">{{ $t(`facets.${facet.label}`) }}</span>
        </template>
        <template #default>
          <CustomSlicedFilters :max="6" :filters="facet.filters" class="xds:pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="xds:flex xds:flex-col xds:gap-8"
            >
              <SimpleFilter :filter="filter" :css-classes="['xds:filter-facet-lg xds:w-full']">
                <template #label>
                  <RadioButtonSelectedIcon v-if="filter.selected" class="xds:icon-lg" />
                  <RadioButtonUnselectedIcon v-else class="xds:icon-lg" />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
                </template>
              </SimpleFilter>
            </FiltersList>
          </CustomSlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #hierarchical-facet="{ facet }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="xds:border-0 xds:border-t xds:border-neutral-10"
      >
        <template #header>
          <span class="xds:title3">{{ $t(`facets.${facet.label}`) }}</span>
        </template>
        <template #default>
          <CustomSlicedFilters :max="6" :filters="facet.filters" class="xds:pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="xds:flex xds:flex-col xds:gap-8"
            >
              <HierarchicalFilter
                :filter="filter"
                children-filters-class="xds:ml-16 xds:mt-8 xds:flex xds:flex-col xds:gap-8"
                filter-item-class="xds:w-full xds:filter-facet-lg"
              >
                <template #label="{ filter: hierarchicalFilter }">
                  <RadioButtonSelectedIcon v-if="filter.selected" class="xds:icon-lg" />
                  <RadioButtonUnselectedIcon v-else class="xds:icon-lg" />
                  <span class="x-filter__label">{{ hierarchicalFilter.label }}</span>
                  <span class="x-filter__count">({{ hierarchicalFilter.totalResults }})</span>
                </template>
              </HierarchicalFilter>
            </FiltersList>
          </CustomSlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #number-range-facet="{ facet }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="xds:border-0 xds:border-t xds:border-neutral-10"
      >
        <template #header>
          <span class="xds:title3">{{ $t(`facets.${facet.label}`) }}</span>
        </template>
        <template #default>
          <CustomSlicedFilters :max="6" :filters="facet.filters" class="xds:pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="xds:flex xds:flex-col xds:gap-8"
            >
              <NumberRangeFilter :filter="filter" :css-classes="['xds:filter-facet-lg xds:w-full']">
                <template #label>
                  <RadioButtonSelectedIcon v-if="filter.selected" class="xds:icon-lg" />
                  <RadioButtonUnselectedIcon v-else class="xds:icon-lg" />
                  <PriceFilterLabel :filter="filter" />
                </template>
              </NumberRangeFilter>
            </FiltersList>
          </CustomSlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #price="{ facet, selectedFilters }">
      <PriceFacet
        :facet="facet"
        :selected-filters="selectedFilters"
        :set-facet-label="setFacetLabel"
      />
    </template>
  </Facets>
</template>

<script setup lang="ts">
import type { TranslateResult } from 'vue-i18n'
import {
  capitalize,
  RadioButtonSelectedIcon,
  RadioButtonUnselectedIcon,
  StaggeredFadeAndSlide,
} from '@empathyco/x-components'
import {
  Facets,
  FiltersList,
  HierarchicalFilter,
  NumberRangeFilter,
  SimpleFilter,
} from '@empathyco/x-components/facets'
import CustomHeaderTogglePanel from '../../custom-header-toggle-panel.vue'
import CustomSlicedFilters from './custom-sliced-filters.vue'
import PriceFacet from './price-facet.vue'
import PriceFilterLabel from './price-filter-label.vue'

const staggeredFadeAndSlide = StaggeredFadeAndSlide as any

/**
 * Checks if the vue-i18n translation returns the missing key error message,
 * if so, returns the facet's label without translating it, otherwise it returns
 * the translated result.
 *
 * @param message - The vue-i18n translation message.
 * @param facetLabel - The facet's label.
 *
 * @returns A translated result or the facet's label.
 */
const setFacetLabel = (message: TranslateResult, facetLabel: string): string | TranslateResult => {
  return message.toString().startsWith('[i18n]') ? capitalize(facetLabel) : message
}
</script>
