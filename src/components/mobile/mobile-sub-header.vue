<template>
  <div class="x-layout__sub-header">
    <div class="x-layout__sub-header-content">
      <LocationProvider location="predictive_layer">
        <RelatedTags class="x-pb-16" />
      </LocationProvider>
      <div v-if="$x.query.search && !$x.redirections.length" class="x-layout-item">
        <MobileToolbar class="x-mb-16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LocationProvider } from '@empathyco/x-components';
  import MobileToolbar from '../mobile/mobile-toolbar.vue';
  import { RelatedTags } from '../search';

  export default defineComponent({
    components: {
      MobileToolbar,
      LocationProvider,
      RelatedTags
    },
    props: {
      hasScrolled: {
        type: Boolean
      },
      hasSearched: {
        type: Boolean
      }
    }
  });
</script>

<style lang="scss">
  @import '../collapse-heigth-animation.scss';
</style>
