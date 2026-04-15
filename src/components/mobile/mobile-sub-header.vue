<template>
  <div class="xds:flex xds:flex-auto xds:flex-col">
    <LocationProvider location="predictive_layer">
      <RelatedTags v-if="hasSearched" class="xds:pb-16" />
    </LocationProvider>
    <MobileToolbar v-if="hasSearched" class="xds:mb-16" />
  </div>
</template>

<script setup lang="ts">
import { LocationProvider } from '@empathyco/x-components'
import { defineAsyncComponent } from 'vue'
import MobileToolbar from '../mobile/mobile-toolbar.vue'

defineProps<{
  hasSearched?: boolean
}>()

const RelatedTags = defineAsyncComponent(() => import('../search').then(m => m.RelatedTags))
</script>
