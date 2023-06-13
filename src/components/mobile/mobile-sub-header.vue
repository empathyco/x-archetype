<template>
  <CollapseHeightAnimation class="x-layout-item" :isCollapsed="hasScrolledPastThreshold">
    <div>
      <LocationProvider location="predictive_layer">
        <RelatedTags class="x-pb-16" />
      </LocationProvider>
      <div v-if="$x.query.search && !$x.redirections.length">
        <MobileToolbar class="x-mb-16" />
      </div>
    </div>
  </CollapseHeightAnimation>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LocationProvider } from '@empathyco/x-components';
  import MobileToolbar from '../mobile/mobile-toolbar.vue';
  import { RelatedTags } from '../search';
  import CollapseHeightAnimation from '../collapse-height-animation.vue';
  import IsScrollingUp from '../has-scroll-past-threshold.mixin';

  export default defineComponent({
    components: {
      CollapseHeightAnimation,
      MobileToolbar,
      LocationProvider,
      RelatedTags
    },
    mixins: [IsScrollingUp],
    props: {
      hasSearched: {
        type: Boolean
      }
    }
  });
</script>
