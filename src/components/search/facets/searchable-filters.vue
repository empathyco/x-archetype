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
  import type { Filter } from '@empathyco/x-types';
  import type { PropType } from 'vue';
  import { StaggeredFadeAndSlide } from '@empathyco/x-components';
  import {
    FiltersList,
    FiltersSearch,
    SimpleFilter,
    SlicedFilters
  } from '@empathyco/x-components/facets';
import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      FiltersList,
      FiltersSearch,
      SlicedFilters,
      SimpleFilter
    },
    props: {
      filters: Array as PropType<Filter[]>
    },
    setup() {
      return {
        staggeredFadeAndSlide: StaggeredFadeAndSlide
      };
    }
  });
</script>
