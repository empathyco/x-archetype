<template>
  <CollapseHeigthAnimation
    class="x-layout-max-width-md desktop:x-layout-min-margin-32 large:x-layout-max-width-lg large:x-layout-min-margin-48"
    :isExtended="hasScrolled"
  >
    <div class="x-layout__sub-header-content">
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
    </div>
  </CollapseHeigthAnimation>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { LocationProvider } from '@empathyco/x-components';
  import RelatedTags from '../search/related-tags.vue';
  import CollapseHeigthAnimation from '../collapse-heigth-animation.vue';
  import IsScrollingUp from '../is-scrolling-up.mixin';
  import DesktopSearchboxAlign from './desktop-searchbox-align.vue';
  import DesktopToolbar from './desktop-toolbar.vue';

  export default defineComponent({
    components: {
      LocationProvider,
      RelatedTags,
      CollapseHeigthAnimation,
      DesktopToolbar,
      DesktopSearchboxAlign,
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters)
    },
    mixins: [IsScrollingUp],
    props: {
      hasScrolled: {
        type: Boolean
      },
      hasSearched: {
        type: Boolean
      },
      isFullPredictive: {
        type: Boolean
      }
    }
  });
</script>
