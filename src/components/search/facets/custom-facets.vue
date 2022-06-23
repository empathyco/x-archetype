<template>
  <Facets>
    <template #default="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span class="x-font-size--05 x-font-weight--bold">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
        </template>
        <template #default>
          <AllFilter v-slot="{ isSelected }" :facet="facet">
            <CheckboxCardSelectedIcon v-if="isSelected" class="x-icon--l" />
            <CheckboxCardUnselectedIcon v-else class="x-icon--l" />
            <span>{{ $t('filters.all') }}</span>
          </AllFilter>

          <SlicedFilters :max="6" :filters="facet.filters">
            <FiltersList
              v-slot="{ filter }"
              class="x-list--gap-03"
              :animation="staggeredFadeAndSlide"
            >
              <SimpleFilter :filter="filter">
                <template #label>
                  <CheckboxCardSelectedIcon v-if="filter.selected" class="x-icon--l" />
                  <CheckboxCardUnselectedIcon v-else class="x-icon--l" />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
                </template>
              </SimpleFilter>
            </FiltersList>
          </SlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #category-paths="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span class="x-font-size--05 x-font-weight--bold">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
        </template>
        <template #default>
          <AllFilter v-slot="{ isSelected }" :facet="facet">
            <CheckboxCardSelectedIcon v-if="isSelected" class="x-icon--l" />
            <CheckboxCardUnselectedIcon v-else class="x-icon--l" />
            <span>{{ $t('filters.all') }}</span>
          </AllFilter>

          <FiltersList
            v-slot="{ filter }"
            class="x-list--gap-03"
            :filters="facet.filters"
            :animation="staggeredFadeAndSlide"
          >
            <HierarchicalFilter :filter="filter">
              <template #label="{ filter }">
                <CheckboxCardSelectedIcon v-if="filter.selected" class="x-icon--l" />
                <CheckboxCardUnselectedIcon v-else class="x-icon--l" />
                <span class="x-filter__label">{{ filter.label }}</span>
                <span class="x-filter__count">({{ filter.totalResults }})</span>
              </template>
            </HierarchicalFilter>
          </FiltersList>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #usage="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span class="x-font-size--05 x-font-weight--bold">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
        </template>
        <template #default>
          <SlicedFilters :max="8">
            <MultiSelectFilters
              v-slot="{ filter }"
              class="x-list--gap-03"
              :animation="staggeredFadeAndSlide"
            >
              <SimpleFilter :filter="filter">
                <template #label>
                  <CheckboxCardSelectedIcon v-if="filter.selected" class="x-icon--l" />
                  <CheckboxCardUnselectedIcon v-else class="x-icon--l" />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
                </template>
              </SimpleFilter>
            </MultiSelectFilters>
          </SlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #price="{ facet, selectedFilters }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span class="x-font-size--05 x-font-weight--bold">{{ $t(`facets.${facet.label}`) }}</span>
          <FacetSelectedFilters :selectedFilters="selectedFilters" />
        </template>
        <template #default>
          <FiltersList
            v-slot="{ filter }"
            class="x-list--gap-03"
            :filters="facet.filters"
            :animation="staggeredFadeAndSlide"
          >
            <NumberRangeFilter :filter="filter">
              <template #label>
                <CheckboxCardSelectedIcon v-if="filter.selected" class="x-icon--l" />
                <CheckboxCardUnselectedIcon v-else class="x-icon--l" />
                <PriceFilterLabel :filter="filter" />
              </template>
            </NumberRangeFilter>
          </FiltersList>
        </template>
      </CustomHeaderTogglePanel>
    </template>
  </Facets>
</template>

<script lang="ts">
  import {
    BaseHeaderTogglePanel,
    StaggeredFadeAndSlide,
    CheckboxCardUnselectedIcon,
    CheckboxCardSelectedIcon
  } from '@empathyco/x-components';
  import {
    SimpleFilter,
    HierarchicalFilter,
    AllFilter,
    Facets,
    SlicedFilters,
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

  @Component({
    components: {
      AllFilter,
      BaseHeaderTogglePanel,
      CheckboxCardUnselectedIcon,
      CheckboxCardSelectedIcon,
      CustomHeaderTogglePanel,
      Facets,
      FiltersList,
      FiltersSearch,
      HierarchicalFilter,
      NumberRangeFilter,
      PriceFilterLabel,
      SelectedFilters,
      SimpleFilter,
      SlicedFilters,
      StaggeredFadeAndSlide,
      FacetSelectedFilters
    }
  })
  export default class CustomFacets extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;
  }
</script>
