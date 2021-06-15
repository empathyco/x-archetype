<template>
  <div class="x-list x-list--gap-05 x-list--padding-05 x-list--padding-bottom">
    <ClearFilters #default="{ selectedFilters }" class="x-button--secondary" :alwaysVisible="false">
      {{ $t('selectedFilters.clear', { selectedFiltersNumber: selectedFilters.length }) }}
    </ClearFilters>

    <SelectedFiltersList
      #default="{ filter }"
      class="x-list--wrap x-list--justify-stretch x-list--gap-05"
    >
      <SimpleFilter :filter="filter" />
    </SelectedFiltersList>
  </div>
</template>

<script lang="ts">
  import { ClearFilters, SelectedFiltersList, SimpleFilter } from '@empathy/x-components/facets';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { BasePriceFilterLabel } from '@empathy/x-components';

  @Component({
    components: {
      BasePriceFilterLabel,
      ClearFilters,
      SelectedFiltersList,
      SimpleFilter
    }
  })
  export default class SelectedFilters extends Vue {}
</script>
