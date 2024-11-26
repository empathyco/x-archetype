<template>
  <CollapseHeightAnimation class="x-layout-item" :is-collapsed="hasScrolledPastThreshold">
    <div>
      <LocationProvider location="predictive_layer">
        <RelatedTags v-if="hasSearched" class="x-pb-16" />
      </LocationProvider>
      <div v-if="hasSearched">
        <MobileToolbar class="x-mb-16" />
      </div>
    </div>
  </CollapseHeightAnimation>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import { defineAsyncComponent, defineComponent } from 'vue';
  import { useHasScrollPastThreshold } from '../../composables/use-has-scroll-past-threshold.composable';
  import CollapseHeightAnimation from '../collapse-height-animation.vue';
   
  import MobileToolbar from '../mobile/mobile-toolbar.vue';

  export default defineComponent({
    components: {
      CollapseHeightAnimation,
      MobileToolbar,
      LocationProvider,
      RelatedTags: defineAsyncComponent(() => import('../search').then(m => m.RelatedTags))
    },
    props: {
      hasSearched: {
        type: Boolean
      }
    },
    setup() {
      const { hasScrolledPastThreshold } = useHasScrollPastThreshold();
      return { hasScrolledPastThreshold };
    }
  });
</script>
