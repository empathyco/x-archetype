<template>
  <div
    class="x-layout__sub-header x-layout-max-width-md desktop:x-layout-min-margin-32 large:x-layout-max-width-lg large:x-layout-min-margin-48"
  >
    <div class="x-layout__sub-header-content">
      <DesktopSearchboxAlign class="x-layout-container">
        <RelatedTagsFullPredictive />
      </DesktopSearchboxAlign>

      <div v-if="!$x.redirections.length && hasSearched">
        <DesktopToolbar />
      </div>
      <div v-if="$x.totalResults > 0 && hasSearched && $x.selectedFilters.length">
        <SelectedFilters class="x-py-16" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  //import RelatedTagsFloatedPredictive from './related-tags-floated-predictive.vue';
  import RelatedTagsFullPredictive from './related-tags-full-predictive.vue';
  import DesktopSearchboxAlign from './desktop-searchbox-align.vue';
  import DesktopToolbar from './desktop-toolbar.vue';

  export default defineComponent({
    components: {
      DesktopToolbar,
      //RelatedTagsFloatedPredictive,
      RelatedTagsFullPredictive,
      DesktopSearchboxAlign,
      SelectedFilters: () => import('../search').then(m => m.SelectedFilters)
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
