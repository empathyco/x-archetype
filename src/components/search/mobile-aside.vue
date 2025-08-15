<template>
  <div v-if="x.totalResults > 0" class="x-flex x-min-h-0 x-flex-auto x-flex-col">
    <BaseScroll class="x-flex-auto x-p-16 x-pt-0" :reset-on-change="false">
      <Sort />
      <CustomFacets />
    </BaseScroll>
    <div class="x-flex x-flex-col x-border-t x-border-neutral-90">
      <SelectedFilters
        v-if="x.selectedFilters.length"
        class="x-flex x-flex-col x-items-stretch x-gap-16 x-py-16"
      />
      <MobileCloseAside />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseScroll, use$x } from '@empathyco/x-components'
import MobileCloseAside from '../mobile/mobile-close-aside.vue'
import CustomFacets from './facets/custom-facets.vue'
import SelectedFilters from './facets/selected-filters.vue'
import Sort from './sort.vue'

const x = use$x()
</script>
