<template>
  <Facets>
    <template #default="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel
        :data-test="facet.label"
        class="x-border-0 x-border-b x-border-neutral-10"
      >
        <template #header>
          <span class="x-title3">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
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
              <SimpleFilter :filter="filter" class="x-facet-filter-lg x-w-full">
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
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
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
                childrenFiltersClass="x-ml-16 x-mt-8 x-flex x-flex-col x-gap-8"
                filterItemClass="x-w-full x-facet-filter-lg"
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
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
        </template>
        <template #default>
          <CustomSlicedFilters :max="6" :filters="facet.filters" class="x-pb-24">
            <FiltersList
              v-slot="{ filter }"
              :animation="staggeredFadeAndSlide"
              class="x-flex x-flex-col x-gap-8"
            >
              <NumberRangeFilter :filter="filter" class="x-facet-filter-lg x-w-full">
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
    BaseHeaderTogglePanel,
    StaggeredFadeAndSlide,
    CheckboxUnselectedIcon,
    CheckboxSelectedIcon
  } from '@empathyco/x-components';
  import {
    SimpleFilter,
    HierarchicalFilter,
    AllFilter,
    Facets,
    SelectedFilters,
    FiltersList,
    NumberRangeFilter,
    FiltersSearch
  } from '@empathyco/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import CustomHeaderTogglePanel from '../../custom-header-toggle-panel.vue';
  import PriceFilterLabel from './price-filter-label.vue';
  import FacetSelectedFilters from './facet-selected-filters.vue';
  import CustomSlicedFilters from './custom-sliced-filters.vue';

  @Component({
    components: {
      AllFilter,
      BaseHeaderTogglePanel,
      CheckboxUnselectedIcon,
      CheckboxSelectedIcon,
      CustomHeaderTogglePanel,
      CustomSlicedFilters,
      Facets,
      FiltersList,
      FiltersSearch,
      HierarchicalFilter,
      NumberRangeFilter,
      PriceFilterLabel,
      SelectedFilters,
      SimpleFilter,
      StaggeredFadeAndSlide,
      FacetSelectedFilters
    }
  })
  export default class CustomFacets extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;
  }
</script>
