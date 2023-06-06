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
  .x-layout__sub-header {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 0.35s;
  }
  .x-layout__sub-header-content {
    min-height: 0;
    transition: visibility 0.35s;
    visibility: hidden;
  }

  .x-layout--is-scrolling-up {
    .x-layout__sub-header {
      grid-template-rows: 1fr;
    }
  }
  .x-layout--is-scrolling-up {
    .x-layout__sub-header .x-layout__sub-header-content {
      visibility: visible;
    }
  }
</style>
