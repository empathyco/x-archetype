<template>
  <CollapseHeightAnimation :isCollapsed="hasScrolledPastThreshold">
    <MaxDesktopWidthItem>
      <DesktopSearchboxAlign>
        <div class="x-layout-item" :class="{ 'x-grid x-grid-cols-6': !isFullPredictive }">
          <LocationProvider location="predictive_layer">
            <RelatedTags v-if="$x.relatedTags.length > 0" class="x-pb-24" />
          </LocationProvider>
        </div>
      </DesktopSearchboxAlign>

      <div v-if="!$x.redirections.length && hasSearched">
        <DesktopToolbar />
      </div>
      <div v-if="$x.totalResults > 0 && hasSearched && $x.selectedFilters.length">
        <SelectedFilters class="x-py-16" />
      </div>
    </MaxDesktopWidthItem>
  </CollapseHeightAnimation>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LocationProvider } from '@empathyco/x-components';
  import RelatedTags from '../search/related-tags.vue';
  import CollapseHeightAnimation from '../collapse-height-animation.vue';
  import IsScrollingUp from '../has-scroll-past-threshold.mixin';
  import MaxDesktopWidthItem from '../max-desktop-width-item.vue';
  import DesktopSearchboxAlign from './desktop-searchbox-align.vue';
  import DesktopToolbar from './desktop-toolbar.vue';

  export default defineComponent({
    components: {
      MaxDesktopWidthItem,
      LocationProvider,
      RelatedTags,
      CollapseHeightAnimation,
      DesktopToolbar,
      DesktopSearchboxAlign,
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters)
    },
    mixins: [IsScrollingUp],
    props: {
      hasSearched: {
        type: Boolean
      },
      isFullPredictive: {
        type: Boolean
      }
    }
  });
</script>
