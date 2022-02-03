<template>
  <FiltersSearch :filters="filters">
    <SlicedFilters :max="8">
      <FiltersList v-slot="{ filter }" :animation="staggeredFadeAndSlide">
        <SimpleFilter :filter="filter" />
      </FiltersList>
    </SlicedFilters>
  </FiltersSearch>
</template>

<script lang="ts">
  import { Filter } from '@empathyco/x-types';
  import { StaggeredFadeAndSlide } from '@empathyco/x-components';
  import {
    FiltersList,
    FiltersSearch,
    SimpleFilter,
    SlicedFilters
  } from '@empathyco/x-components/facets';
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({
    components: {
      FiltersList,
      FiltersSearch,
      SlicedFilters,
      SimpleFilter,
      StaggeredFadeAndSlide
    }
  })
  export default class SearchableFilters extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;

    @Prop()
    protected filters!: Filter[];
  }
</script>
