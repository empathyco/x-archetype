<template>
  <span
    v-if="selectedFilters.length > 0"
    :class="{ 'x-badge-circle': selectedFilters.length <= 9 }"
    class="x-badge x-badge-auxiliary"
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
