<template>
  <Facets>
    <template #default="{ facet }">
      <Facet :facet="facet">
        <AllFilter :facet="facet" />
        <SlicedFilters :max="8" :filters="facet.filters">
          <MultiSelectFilters v-slot="{ filter }" :animation="staggeredFadeAndSlide">
            <SimpleFilter :filter="filter" />
          </MultiSelectFilters>
        </SlicedFilters>
      </Facet>
    </template>

    <template #categoryPaths="{ facet }">
      <BaseHeaderTogglePanel class="x-facet">
        <template #header-content>
          <span>{{ facet.label }}</span>
          <span class="x-icon">▾</span>
        </template>
        <SelectedFilters :facetId="facet.id" />
        <AllFilter :facet="facet" />
        <Filters
          v-slot="{ filter: hierarchicalFilter }"
          :filters="facet.filters"
          :animation="staggeredFadeAndSlide"
        >
          <HierarchicalFilter
            v-slot="{ filter, clickFilter, cssClasses, isDisabled }"
            :filter="hierarchicalFilter"
          >
            <label :class="cssClasses">
              <input @change="clickFilter" :disabled="isDisabled" type="checkbox" />
              {{ filter.label }}
            </label>
          </HierarchicalFilter>
        </Filters>
      </BaseHeaderTogglePanel>
    </template>

    <template #brand_facet="{ facet }">
      <Facet :facet="facet">
        <SearchableFilters :filters="facet.filters" />
      </Facet>
    </template>

    <template #price_facet="{ facet }">
      <Facet :facet="facet">
        <NumberRangeFilters :filters="facet.filters" />
      </Facet>
    </template>
  </Facets>
</template>

<script lang="ts">
  import { BaseHeaderTogglePanel, StaggeredFadeAndSlide } from '@empathy/x-components';
  import {
    SimpleFilter,
    MultiSelectFilters,
    AllFilter,
    Facets,
    SlicedFilters,
    SelectedFilters,
    Filters,
    HierarchicalFilter
  } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import FacetComponent from './facet.vue';
  import SearchableFilters from './searchable-filters.vue';
  import NumberRangeFilters from './number-range-filters.vue';

  @Component({
    components: {
      BaseHeaderTogglePanel,
      SearchableFilters,
      StaggeredFadeAndSlide,
      NumberRangeFilters,
      SimpleFilter,
      MultiSelectFilters,
      AllFilter,
      Facets,
      Facet: FacetComponent,
      Filters,
      HierarchicalFilter,
      SlicedFilters,
      SelectedFilters
    }
  })
  export default class FacetsComponent extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;
  }
</script>
