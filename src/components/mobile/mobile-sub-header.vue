<template>
  <CollapseHeightAnimation class="x-layout-item" :isCollapsed="hasScrolledPastThreshold">
    <div>
      <LocationProvider location="predictive_layer">
        <RelatedTags v-if="hasSearched" class="x-pb-16" />
      </LocationProvider>
      <div v-if="x.query.search">
        <MobileToolbar class="x-mb-16" />
      </div>
    </div>
  </CollapseHeightAnimation>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue';
  import { LocationProvider, use$x } from '@empathyco/x-components';
  import MobileToolbar from '../mobile/mobile-toolbar.vue';
  import CollapseHeightAnimation from '../collapse-height-animation.vue';
  // eslint-disable-next-line max-len
  import { useHasScrollPastThreshold } from '../../composables/use-has-scroll-past-threshold.composable';

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
      return { hasScrolledPastThreshold, x: use$x() };
    }
  });
</script>
