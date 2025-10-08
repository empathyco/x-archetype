<template>
  <Facets>
    <template #default="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="x-border-0 x-border-b x-border-neutral-10"
      >
        <template #header>
          <span class="x-title3">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selected-filters="selectedFilters" />
        </template>
        <template #default>
          <AllFilter
            v-slot="{ isSelected }"
            :facet="facet"
            class="x-facet-filter-lg x-mb-8 x-w-full"
          >
            <CheckboxSelectedIcon v-if="isSelected" class="x-icon-lg" />
            <CheckboxUnselectedIcon v-else class="x-icon-lg" />
            <span>{{ $t('filters.all') }}</span>
          </AllFilter>

          <CustomSlicedFilters :max="6" :filters="facet.filters" class="x-pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="x-flex x-flex-col x-gap-8"
            >
              <SimpleFilter :filter="filter" :css-classes="['x-facet-filter-lg x-w-full']">
                <template #label>
                  <CheckboxSelectedIcon v-if="filter.selected" class="x-icon-lg" />
                  <CheckboxUnselectedIcon v-else class="x-icon-lg" />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
                </template>
              </SimpleFilter>
            </FiltersList>
          </CustomSlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #hierarchical-facet="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="x-border-0 x-border-b x-border-neutral-10"
      >
        <template #header>
          <span class="x-title3">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selected-filters="selectedFilters" />
        </template>
        <template #default>
          <AllFilter
            v-slot="{ isSelected }"
            :facet="facet"
            class="x-facet-filter-lg x-mb-8 x-w-full"
          >
            <CheckboxSelectedIcon v-if="isSelected" class="x-icon-lg" />
            <CheckboxUnselectedIcon v-else class="x-icon-lg" />
            <span>{{ $t('filters.all') }}</span>
          </AllFilter>
          <CustomSlicedFilters :max="6" :filters="facet.filters" class="x-pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="x-flex x-flex-col x-gap-8"
            >
              <HierarchicalFilter
                :filter="filter"
                children-filters-class="x-ml-16 x-mt-8 x-flex x-flex-col x-gap-8"
                filter-item-class="x-w-full x-facet-filter-lg"
              >
                <template #label="{ filter: hierarchicalFilter }">
                  <CheckboxSelectedIcon v-if="hierarchicalFilter.selected" class="x-icon-lg" />
                  <CheckboxUnselectedIcon v-else class="x-icon-lg" />
                  <span class="x-filter__label">{{ hierarchicalFilter.label }}</span>
                  <span class="x-filter__count">({{ hierarchicalFilter.totalResults }})</span>
                </template>
              </HierarchicalFilter>
            </FiltersList>
          </CustomSlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #number-range-facet="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="x-border-0 x-border-b x-border-neutral-10"
      >
        <template #header>
          <span class="x-title3">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selected-filters="selectedFilters" />
        </template>
        <template #default>
          <CustomSlicedFilters :max="6" :filters="facet.filters" class="x-pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="x-flex x-flex-col x-gap-8"
            >
              <NumberRangeFilter :filter="filter" :css-classes="['x-facet-filter-lg x-w-full']">
                <template #label>
                  <CheckboxSelectedIcon v-if="filter.selected" class="x-icon-lg" />
                  <CheckboxUnselectedIcon v-else class="x-icon-lg" />
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
  CheckboxSelectedIcon,
  CheckboxUnselectedIcon,
  StaggeredFadeAndSlide,
} from '@empathyco/x-components'
import {
  AllFilter,
  Facets,
  FiltersList,
  HierarchicalFilter,
  NumberRangeFilter,
  SimpleFilter,
} from '@empathyco/x-components/facets'
import CustomHeaderTogglePanel from '../../custom-header-toggle-panel.vue'
import CustomSlicedFilters from './custom-sliced-filters.vue'
import FacetSelectedFilters from './facet-selected-filters.vue'
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
