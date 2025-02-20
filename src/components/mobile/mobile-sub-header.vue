<template>
  <div class="x-flex x-flex-auto x-flex-col">
    <LocationProvider location="predictive_layer">
      <RelatedTags v-if="hasSearched" class="x-pb-16" />
    </LocationProvider>
    <MobileToolbar v-if="hasSearched" class="x-mb-16" />
  </div>
</template>

<script lang="ts">
import { LocationProvider } from '@empathyco/x-components'
import { defineAsyncComponent, defineComponent } from 'vue'

import MobileToolbar from '../mobile/mobile-toolbar.vue'

export default defineComponent({
  components: {
    MobileToolbar,
    LocationProvider,
    RelatedTags: defineAsyncComponent(() => import('../search').then(m => m.RelatedTags)),
  },
  props: {
    hasSearched: {
      type: Boolean,
    },
  },
})
</script>
