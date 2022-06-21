<template>
  <Facets>
    <template #default="{ facet }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span>{{ $t(`facets.${facet.label}`) }}</span>
        </template>
        <template #default>
          <AllFilter v-slot="{ isSelected }" :facet="facet">
            <CheckboxCardSelectedIcon v-if="isSelected" />
            <CheckboxCardUnselectedIcon v-else />
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
                  <CheckboxCardSelectedIcon v-if="filter.selected" />
                  <CheckboxCardUnselectedIcon v-else />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
                </template>
              </SimpleFilter>
            </FiltersList>
          </SlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #category-paths="{ facet }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span>{{ $t(`facets.${facet.label}`) }}</span>
        </template>
        <template #default>
          <AllFilter v-slot="{ isSelected }" :facet="facet">
            <CheckboxCardSelectedIcon v-if="isSelected" />
            <CheckboxCardUnselectedIcon v-else />
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
                <CheckboxCardSelectedIcon v-if="filter.selected" />
                <CheckboxCardUnselectedIcon v-else />
                <span class="x-filter__label">{{ filter.label }}</span>
                <span class="x-filter__count">({{ filter.totalResults }})</span>
              </template>
            </HierarchicalFilter>
          </FiltersList>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #usage="{ facet }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span>{{ $t(`facets.${facet.label}`) }}</span>
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
                  <CheckboxCardSelectedIcon v-if="filter.selected" />
                  <CheckboxCardUnselectedIcon v-else />
                  <span class="x-filter__label">{{ filter.label }}</span>
                  <span class="x-filter__count">({{ filter.totalResults }})</span>
                </template>
              </SimpleFilter>
            </MultiSelectFilters>
          </SlicedFilters>
        </template>
      </CustomHeaderTogglePanel>
    </template>

    <template #price="{ facet }">
      <CustomHeaderTogglePanel :data-test="facet.label">
        <template #header>
          <span>{{ $t(`facets.${facet.label}`) }}</span>
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
                <CheckboxCardSelectedIcon v-if="filter.selected" />
                <CheckboxCardUnselectedIcon v-else />
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
      StaggeredFadeAndSlide
    }
  })
  export default class FacetsComponent extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;
  }
</script>
