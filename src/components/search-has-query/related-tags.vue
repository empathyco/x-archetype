<template>
  <SlidingPanel
    class="x-sliding-panel--buttons-overflow x-sliding-panel--show-buttons-on-hover"
    :showButtons="$x.device !== 'mobile'"
  >
    <RelatedTags
      class="x-list--gap-03 x-tag--pill"
      :highlightCurated="true"
      :animation="relatedTagsAnimation"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon />
      </template>

      <template #related-tag-content="{ relatedTag, isSelected, shouldHighlightCurated }">
        <TagIcon v-if="shouldHighlightCurated" />
        {{ relatedTag.tag }}
        <CrossTinyIcon v-if="isSelected" />
        <PlusIcon v-else />
      </template>

      <template #sliding-panel-right-button>
        <ChevronRightIcon />
      </template>
    </RelatedTags>
  </SlidingPanel>
</template>

<script lang="ts">
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CrossTinyIcon,
    PlusIcon,
    SlidingPanel,
    StaggeredFadeAndSlide,
    TagIcon
  } from '@empathyco/x-components';
  import { RelatedTags } from '@empathyco/x-components/related-tags';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      CrossTinyIcon,
      PlusIcon,
      RelatedTags,
      SlidingPanel,
      TagIcon
    }
  })
  export default class RelatedTagsComponent extends Vue {
    protected relatedTagsAnimation = StaggeredFadeAndSlide;
  }
</script>
