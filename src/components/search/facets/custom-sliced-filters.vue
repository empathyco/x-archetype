<template>
  <SlicedFilters v-bind="$attrs" buttonClass="x-facet-filter-lg x-mt-8 x-w-full">
    <template #show-more>
      <PlusIcon class="x-icon-lg" />
      {{ $t('filters.showMore') }}
    </template>
    <template #show-less>
      <MinusIcon class="x-icon-lg" />
      {{ $t('filters.showLess') }}
    </template>
    <slot />
  </SlicedFilters>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { MinusIcon, PlusIcon } from '@empathyco/x-components';
  import { SlicedFilters } from '@empathyco/x-components/facets';

  @Component({
    components: {
      MinusIcon,
      PlusIcon,
      SlicedFilters
    }
  })
  export default class CustomSlicedFilters extends Vue {}
</script>
