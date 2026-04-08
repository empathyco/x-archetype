<template>
  <div v-if="filtersWithLabel.length" class="xds:flex xds:gap-8 xds:text1-sm xds:text-lead-50">
    <div class="xds:truncate">
      <span v-for="filter in filtersWithLabel" :key="filter.id" class="xds:pr-8">
        {{ filter.label }}
      </span>
    </div>
    <span v-if="showLength">({{ filtersList?.length }})</span>
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
