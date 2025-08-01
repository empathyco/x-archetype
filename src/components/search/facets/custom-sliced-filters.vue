<template>
  <SlicedFilters :filters :parent-id :max button-class="x-facet-filter-lg x-mt-8 x-w-full">
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

<script setup lang="ts">
import type { Filter } from '@empathyco/x-types'
import { MinusIcon, PlusIcon } from '@empathyco/x-components'
import { SlicedFilters } from '@empathyco/x-components/facets'

defineProps<{
  /** Copy of SlicedFilters props. TODO use SlicedFilters props type interface */
  /** The list of filters to be rendered as slots. */
  filters: Filter[]
  /**
   * This prop is used in the `HierarchicalFilter` component and only in that case. It is necessary
   * to make the `renderedFilters` to return only the filters of each level of the hierarchy.
   */
  parentId?: string | number
  /** The maximum number of filters to show. */
  max: number
}>()
</script>
