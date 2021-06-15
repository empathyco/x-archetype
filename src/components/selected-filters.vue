<template>
  <div class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom">
    <ClearFilters #default="{ selectedFilters }" class="x-button--secondary" :alwaysVisible="false">
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>

    <SelectedFiltersList class="x-list--wrap x-list--justify-stretch x-list--gap-05">
      <template #default="{ filter }">
        <SimpleFilter :filter="filter" />
      </template>

      <template #price="{ filter }">
        <NumberRangeFilter :filter="filter">
          <template #default="{ filter }">
            <BasePriceFilterLabel
              :filter="filter"
              format="i €"
              :lessThan="$t('priceFilter.lessThan')"
              :fromTo="$t('priceFilter.fromTo')"
              :from="$t('priceFilter.from')"
            />
          </template>
        </NumberRangeFilter>
      </template>
    </SelectedFiltersList>
  </div>
</template>

<script lang="ts">
  import { BasePriceFilterLabel } from '@empathy/x-components';
  import {
    ClearFilters,
    NumberRangeFilter,
    SelectedFiltersList,
    SimpleFilter
  } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      BasePriceFilterLabel,
      ClearFilters,
      SelectedFiltersList,
      NumberRangeFilter,
      SimpleFilter
    }
  })
  export default class SelectedFilters extends Vue {}
</script>
