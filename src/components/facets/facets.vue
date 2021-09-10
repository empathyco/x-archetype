<template>
  <Facets>
    <template #default="{ facet }">
      <Facet :facet="facet">
        <AllFilter #default="{ isSelected }" :facet="facet">
          <CheckboxCardSelectedIcon v-if="isSelected" />
          <CheckboxCardUnselectedIcon v-else />
          <span>{{ $t('filters.all') }}</span>
        </AllFilter>

        <SlicedFilters :max="6" :filters="facet.filters">
          <FiltersList
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
          </FiltersList>
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

        <FiltersList
          #default="{ filter }"
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
        <FiltersList
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
        </FiltersList>
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
  import PriceFilterLabel from './price-filter-label.vue';
  import Facet from './facet.vue';

  @Component({
    components: {
      AllFilter,
      BaseHeaderTogglePanel,
      CheckboxCardUnselectedIcon,
      CheckboxCardSelectedIcon,
      Facet,
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
