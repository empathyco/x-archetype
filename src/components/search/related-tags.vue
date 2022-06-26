<template>
  <CustomSlidingPanel class="x-sliding-panel--buttons-overflow">
    <RelatedTags
      class="x-list--gap-03 x-tag--pill"
      :highlightCurated="true"
      :animation="relatedTagsAnimation"
    >
      <template #related-tag-content="{ relatedTag, isSelected, shouldHighlightCurated }">
        <CuratedCheckIcon v-if="shouldHighlightCurated" />
        {{ relatedTag.tag }}
        <CrossTinyIcon v-if="isSelected" />
        <PlusIcon v-else />
      </template>
    </RelatedTags>
  </CustomSlidingPanel>
</template>

<script lang="ts">
  import {
    CrossTinyIcon,
    PlusIcon,
    StaggeredFadeAndSlide,
    CuratedCheckIcon
  } from '@empathyco/x-components';
  import { RelatedTags } from '@empathyco/x-components/related-tags';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';

  @Component({
    components: {
      CustomSlidingPanel,
      CrossTinyIcon,
      PlusIcon,
      RelatedTags,
      CuratedCheckIcon
    }
  })
  export default class RelatedTagsComponent extends Vue {
    protected relatedTagsAnimation = StaggeredFadeAndSlide;
  }
</script>
