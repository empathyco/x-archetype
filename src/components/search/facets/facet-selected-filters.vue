<template>
  <span
    v-if="selectedFilters.length > 0"
    :class="{ 'xds:badge-circle': selectedFilters.length <= 9 }"
    class="xds:badge xds:badge-auxiliary"
  >
    {{ selectedFilters.length }}
  </span>
</template>

<script setup lang="ts">
import type { FacetFilter } from '@empathyco/x-types'

defineProps<{
  selectedFilters: FacetFilter[]
}>()
</script>
