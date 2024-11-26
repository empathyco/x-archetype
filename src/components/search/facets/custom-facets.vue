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
                <template #label="{ filter }">
                  <CheckboxSelectedIcon v-if="filter.selected" class="x-icon-lg" />
                  <CheckboxUnselectedIcon v-else class="x-icon-lg" />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
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
  </Facets>
</template>

<script lang="ts">
import {
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
import { defineComponent } from 'vue'
import CustomHeaderTogglePanel from '../../custom-header-toggle-panel.vue'
import CustomSlicedFilters from './custom-sliced-filters.vue'
import FacetSelectedFilters from './facet-selected-filters.vue'
import PriceFilterLabel from './price-filter-label.vue'

export default defineComponent({
  components: {
    AllFilter,
    CheckboxUnselectedIcon,
    CheckboxSelectedIcon,
    CustomHeaderTogglePanel,
    CustomSlicedFilters,
    Facets,
    FiltersList,
    HierarchicalFilter,
    NumberRangeFilter,
    PriceFilterLabel,
    SimpleFilter,
    FacetSelectedFilters,
  },
  setup() {
    return {
      staggeredFadeAndSlide: StaggeredFadeAndSlide,
    }
  },
})
</script>
