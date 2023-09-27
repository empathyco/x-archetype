<template>
  <SlidingPanel
    v-if="$x.relatedTags.length"
    class="x-sliding-panel-show-buttons-on-hover"
    buttonClass="x-button-lead x-button-circle x-button-ghost x-p-0"
    scrollContainerClass="desktop:x-sliding-panel-fade"
    :showButtons="!isTouchable"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="x-icon-lg" />
    </template>
    <RelatedTags
      class="x-gap-8 x-pl-16 tablet:x-pl-24 desktop:x-pl-0"
      :highlightCurated="true"
      :animation="relatedTagsAnimation"
      itemClass="x-tag-outlined x-rounded-full"
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
  import { defineComponent } from 'vue';
  import { useDevice } from '../../composables/use-device.composable';

  export default defineComponent({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      CrossTinyIcon,
      PlusIcon,
      RelatedTags,
      SlidingPanel,
      CuratedCheckIcon
    },

    setup() {
      const relatedTagsAnimation = StaggeredFadeAndSlide;
      const { isTouchable } = useDevice();
      return {
        relatedTagsAnimation,
        isTouchable
      };
    }
  });
</script>
