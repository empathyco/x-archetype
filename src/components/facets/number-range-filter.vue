<template>
  <NumberRangeFilter :filter="filter">
    <template #default="{ filter }">
      <BasePriceFilterLabel
        :filter="filter"
        format="i €"
        lessThan="Less than {max}"
        fromTo="From {min} to {max}"
        from="More than {min}"
      />
    </template>
  </NumberRangeFilter>
</template>

<script lang="ts">
  import { Filter } from '@empathy/search-types';
  import { BasePriceFilterLabel } from '@empathy/x-components';
  import { NumberRangeFilter } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({
    components: {
      BasePriceFilterLabel,
      NumberRangeFilter
    }
  })
  export default class CustomNumberRangeFilter extends Vue {
    @Prop()
    protected filter!: Filter;
  }
</script>
