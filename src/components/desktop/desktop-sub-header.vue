<template>
  <CollapseHeigthAnimation
    class="x-layout-max-width-md desktop:x-layout-min-margin-32 large:x-layout-max-width-lg large:x-layout-min-margin-48"
    :isExtended="hasScrolled"
  >
    <div class="x-layout__sub-header-content">
      <DesktopSearchboxAlign class="x-layout-container">
        <RelatedTagsFullPredictive v-if="fullPredictive" />
        <RelatedTagsFloatedPredictive v-else />
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
  import CollapseHeigthAnimation from '../collapse-heigth-animation.vue';
  import IsScrollingUp from '../is-scrolling-up.mixin';
  import RelatedTagsFullPredictive from './related-tags-full-predictive.vue';
  import DesktopSearchboxAlign from './desktop-searchbox-align.vue';
  import DesktopToolbar from './desktop-toolbar.vue';
  import RelatedTagsFloatedPredictive from './related-tags-floated-predictive.vue';

  export default defineComponent({
    components: {
      CollapseHeigthAnimation,
      RelatedTagsFloatedPredictive,
      DesktopToolbar,
      RelatedTagsFullPredictive,
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
      fullPredictive: {
        type: Boolean
      }
    }
  });
</script>
