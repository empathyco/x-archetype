<template>
  <div v-if="filtersWithLabel.length" class="x-text1-sm x-flex x-gap-8 x-text-lead-50">
    <div class="x-truncate">
      <span v-for="filter in filtersWithLabel" :key="filter.id" class="x-pr-8">
        {{ filter.label }}
      </span>
    </div>
    <span v-if="showLength">({{ filtersList.length }})</span>
  </div>
</template>

<script setup lang="ts">
import type { Filter, HistoryQuery } from '@empathyco/x-types'
import { computed } from 'vue'

type FilterWithLabel = Filter & { label: string }

const props = withDefaults(
  defineProps<{
    filtersList?: Exclude<HistoryQuery['selectedFilters'], undefined>
    showLength?: boolean
  }>(),
  {
    filtersList: () => [],
    showLength: false,
  },
)

const filtersWithLabel = computed(() =>
  props.filtersList.filter((f): f is FilterWithLabel => !!(f as FilterWithLabel).label),
)
</script>
