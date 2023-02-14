<template>
  <SlidingPanel
    v-if="$x.relatedTags.length"
    class="x-sliding-panel-show-buttons-on-hover"
    buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
    scrollContainerClass="desktop:x-sliding-panel-fade"
    :showButtons="$x.device !== 'mobile'"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="x-icon-lg" />
    </template>
    <RelatedTags
      class="x-list--gap-03 x-tag--pill"
      :class="{ 'x-padding--left-05': $x.device === 'mobile' }"
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
    <template #sliding-panel-right-button>
      <ChevronRightIcon class="x-icon-lg" />
    </template>
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
    CuratedCheckIcon
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
      CuratedCheckIcon
    }
  })
  export default class RelatedTagsComponent extends Vue {
    protected relatedTagsAnimation = StaggeredFadeAndSlide;
  }
</script>
