<template>
  <div class="xds:flex xds:flex-auto xds:flex-col">
    <LocationProvider location="predictive_layer">
      <RelatedTags class="xds:pb-16" />
    </LocationProvider>
    <MobileToolbar class="xds:mb-16" />
  </div>
</template>

<script setup lang="ts">
import { LocationProvider } from '@empathyco/x-components'
import RelatedTags from '../search/related-tags.vue'
import MobileToolbar from './mobile-toolbar.vue'
</script>
