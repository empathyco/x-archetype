<template>
  <Filters v-slot="{ filter }" :filters="filters" :animation="staggeredFadeAndSlide">
    <CustomNumberRangeFilter :filter="filter" />
  </Filters>
</template>

<script lang="ts">
  import { Filter } from '@empathy/search-types';
  import { BasePriceFilterLabel, StaggeredFadeAndSlide } from '@empathy/x-components';
  import { Filters } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import CustomNumberRangeFilter from './number-range-filter.vue';

  @Component({
    components: {
      Filters,
      BasePriceFilterLabel,
      CustomNumberRangeFilter,
      StaggeredFadeAndSlide
    }
  })
  export default class NumberRangeFilters extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;

    @Prop()
    protected filters!: Filter[];
  }
</script>
