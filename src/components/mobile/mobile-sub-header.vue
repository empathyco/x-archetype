<template>
  <CollapseHeightAnimation class="x-layout-item" :isCollapsed="hasScrolledPastThreshold">
    <div>
      <LocationProvider location="predictive_layer">
        <RelatedTags v-if="hasSearched" class="x-pb-16" />
      </LocationProvider>
      <div v-if="$x.query.search">
        <MobileToolbar class="x-mb-16" />
      </div>
    </div>
  </CollapseHeightAnimation>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LocationProvider } from '@empathyco/x-components';
  import MobileToolbar from '../mobile/mobile-toolbar.vue';
  import CollapseHeightAnimation from '../collapse-height-animation.vue';
  import IsScrollingUp from '../has-scroll-past-threshold.mixin';

  export default defineComponent({
    components: {
      CollapseHeightAnimation,
      MobileToolbar,
      LocationProvider,
      RelatedTags: () => import('../search').then(m => m.RelatedTags)
    },
    mixins: [IsScrollingUp],
    props: {
      hasSearched: {
        type: Boolean
      }
    }
  });
</script>
