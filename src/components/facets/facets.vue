<template>
  <Facets class="x-list--gap-06 x-list--padding-05 x-list--padding-top">
    <template #default="{ facet }">
      <Facet :facet="facet">
        <AllFilter #default="{ isSelected }" :facet="facet">
          <CheckboxCardSelectedIcon v-if="isSelected" />
          <CheckboxCardUnselectedIcon v-else />
          <span>{{ $t('filters.all') }}</span>
        </AllFilter>

        <SlicedFilters :max="8" :filters="facet.filters">
          <MultiSelectFilters
            #default="{ filter }"
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
      </Facet>
    </template>

    <template #categoryPaths="{ facet }">
      <Facet :facet="facet">
        <AllFilter #default="{ isSelected }" :facet="facet">
          <CheckboxCardSelectedIcon v-if="isSelected" />
          <CheckboxCardUnselectedIcon v-else />
          <span>{{ $t('filters.all') }}</span>
        </AllFilter>

        <Filters
          #default="{ filter }"
          class="x-list--gap-03"
          :filters="facet.filters"
          :animation="staggeredFadeAndSlide"
        >
          <HierarchicalFilter :filter="filter">
            <template #label>
              <CheckboxCardSelectedIcon v-if="filter.selected" />
              <CheckboxCardUnselectedIcon v-else />
              <span class="x-filter__label">{{ filter.label }}</span>
              <span class="x-filter__count">({{ filter.totalResults }})</span>
            </template>
          </HierarchicalFilter>
        </Filters>
      </Facet>
    </template>

    <template #usage="{ facet }">
      <Facet :facet="facet">
        <FiltersSearch class="x-list--gap-03" :filters="facet.filters">
          <template #search="{ query, setQuery }">
            <input
              @input="setQuery($event.target.value)"
              :value="query"
              type="search"
              class="x-input x-filters-search__input"
              data-test="filters-search-input"
              :placeholder="$t('filtersSearch.placeholder')"
            />
          </template>

          <SlicedFilters :max="8">
            <MultiSelectFilters
              #default="{ filter }"
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
        </FiltersSearch>
      </Facet>
    </template>

    <template #price="{ facet }">
      <Facet :facet="facet">
        <Filters
          #default="{ filter }"
          class="x-list--gap-03"
          :filters="facet.filters"
          :animation="staggeredFadeAndSlide"
        >
          <NumberRangeFilter :filter="filter">
            <template #default="{ filter }">
              <CheckboxCardSelectedIcon v-if="filter.selected" />
              <CheckboxCardUnselectedIcon v-else />
              <PriceFilterLabel :filter="filter" />
            </template>
          </NumberRangeFilter>
        </Filters>
      </Facet>
    </template>
  </Facets>
</template>

<script lang="ts">
  import {
    BaseHeaderTogglePanel,
    StaggeredFadeAndSlide,
    CheckboxCardUnselectedIcon,
    CheckboxCardSelectedIcon
  } from '@empathy/x-components';
  import {
    SimpleFilter,
    HierarchicalFilter,
    MultiSelectFilters,
    AllFilter,
    Facets,
    SlicedFilters,
    SelectedFilters,
    Filters,
    NumberRangeFilter,
    FiltersSearch
  } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import PriceFilterLabel from '../price-filter-label.vue';
  import Facet from './facet.vue';

  @Component({
    components: {
      AllFilter,
      BaseHeaderTogglePanel,
      CheckboxCardUnselectedIcon,
      CheckboxCardSelectedIcon,
      Facet,
      Facets,
      Filters,
      FiltersSearch,
      HierarchicalFilter,
      MultiSelectFilters,
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
