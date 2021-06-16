<template>
  <div class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom">
    <ClearFilters #default="{ selectedFilters }" class="x-button--secondary" :alwaysVisible="false">
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>

    <SelectedFiltersList class="x-list--wrap x-list--justify-stretch x-list--gap-05">
      <template #default="{ filter }">
        <SimpleFilter class="x-tag" :filter="filter" />
      </template>

      <template #price="{ filter }">
        <NumberRangeFilter #default="{ filter: priceFilter }" class="x-tag" :filter="filter">
          <PriceFilterLabel :filter="priceFilter" />
        </NumberRangeFilter>
      </template>
    </SelectedFiltersList>
  </div>
</template>

<script lang="ts">
  import {
    ClearFilters,
    NumberRangeFilter,
    SelectedFiltersList,
    SimpleFilter
  } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import PriceFilterLabel from './price-filter-label.vue';

  @Component({
    components: {
      PriceFilterLabel,
      ClearFilters,
      SelectedFiltersList,
      NumberRangeFilter,
      SimpleFilter
    }
  })
  export default class SelectedFiltersComponent extends Vue {}
</script>
