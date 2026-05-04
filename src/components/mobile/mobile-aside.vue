<template>
  <div v-if="x.totalResults > 0" class="xds:flex xds:min-h-0 xds:flex-auto xds:flex-col">
    <BaseScroll class="xds:flex-auto xds:p-16 xds:pt-0" :reset-on-change="false">
      <Sort />
      <CustomFacets />
    </BaseScroll>
    <div class="xds:flex xds:flex-col xds:border-t xds:border-neutral-90">
      <SelectedFilters
        v-if="x.selectedFilters.length"
        class="xds:flex xds:flex-col xds:items-stretch xds:gap-16 xds:py-16"
      />
      <MobileCloseAside />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseScroll, use$x } from '@empathyco/x-components'
import CustomFacets from '../search/facets/custom-facets.vue'
import SelectedFilters from '../search/facets/selected-filters.vue'
import Sort from '../search/sort.vue'
import MobileCloseAside from './mobile-close-aside.vue'

const x = use$x()
</script>
