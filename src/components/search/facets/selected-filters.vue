<template>
  <div class="x-list x-list--horizontal">
    <SelectedFiltersList class="x-list--wrap x-list--justify-stretch x-list--gap-05">
      <template #default="{ filter }">
        <SimpleFilter class="x-tag" :filter="filter" />
      </template>

      <template #price="{ filter }">
        <NumberRangeFilter v-slot="{ filter: priceFilter }" class="x-tag" :filter="filter">
          <PriceFilterLabel :filter="priceFilter" />
        </NumberRangeFilter>
      </template>
    </SelectedFiltersList>

    <ClearFilters
      v-if="$x.device === 'desktop'"
      v-slot="{ selectedFilters }"
      class="x-button--secondary"
      :alwaysVisible="false"
    >
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>
  </div>
</template>

<script lang="ts">
  import {
    ClearFilters,
    NumberRangeFilter,
    SelectedFiltersList,
    SimpleFilter
  } from '@empathyco/x-components/facets';
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
