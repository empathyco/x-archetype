<template>
  <div class="x-layout-item">
    <LocationProvider location="predictive_layer">
      <RelatedTags v-if="$x.relatedTags.length > 0" class="x-pb-24" />
    </LocationProvider>
  </div>
</template>

<script>
  import { LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      LocationProvider,
      RelatedTags: () => import('../search').then(m => m.RelatedTags)
    }
  });
</script>
