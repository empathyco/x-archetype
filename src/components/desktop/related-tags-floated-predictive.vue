<template>
  <div class="x-grid x-grid-cols-6">
    <LocationProvider location="predictive_layer" class="x-col-span-4 x-col-start-2">
      <RelatedTags v-if="$x.relatedTags.length > 0" class="x-pb-24" />
    </LocationProvider>
  </div>
</template>

<script>
  import { LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import { RelatedTags } from '../search';

  export default defineComponent({
    components: {
      LocationProvider,
      RelatedTags
    }
  });
</script>
