<template>
  <SlicedFilters v-bind="$attrs">
    <template #show-more>
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
        <PlusIcon class="x-icon--l" />
        {{ $t('filters.showMore') }}
      </div>
    </template>
    <template #show-less>
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
        <MinusIcon class="x-icon--l" />
        {{ $t('filters.showLess') }}
      </div>
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
