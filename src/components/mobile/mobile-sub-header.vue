<template>
  <CollapseHeigthAnimation class="x-layout-item" :isExtended="hasScrolled">
    <div class="x-layout__sub-header-content">
      <LocationProvider location="predictive_layer">
        <RelatedTags class="x-pb-16" />
      </LocationProvider>
      <div v-if="$x.query.search && !$x.redirections.length">
        <MobileToolbar class="x-mb-16" />
      </div>
    </div>
  </CollapseHeigthAnimation>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LocationProvider } from '@empathyco/x-components';
  import MobileToolbar from '../mobile/mobile-toolbar.vue';
  import { RelatedTags } from '../search';
  import CollapseHeigthAnimation from '../collapse-heigth-animation.vue';
  import IsScrollingUp from '../is-scrolling-up.mixin';

  export default defineComponent({
    components: {
      CollapseHeigthAnimation,
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
