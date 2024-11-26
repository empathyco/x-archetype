<template>
  <SlicedFilters v-bind="$attrs" button-class="x-facet-filter-lg x-mt-8 x-w-full">
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
  import { MinusIcon, PlusIcon } from '@empathyco/x-components';
  import { SlicedFilters } from '@empathyco/x-components/facets';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      MinusIcon,
      PlusIcon,
      SlicedFilters
    }
  });
</script>
