<template>
  <SlidingPanel
    v-if="$x.relatedTags.length"
    class="x-sliding-panel-show-buttons-on-hover"
    buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
    scrollContainerClass="desktop:x-sliding-panel-fade"
    :showButtons="isTouchable"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="x-icon-lg" />
    </template>
    <RelatedTags
      class="x-list--gap-03 x-tag--pill"
      :class="{ 'x-padding--left-05': isTabletOrLess }"
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
      const { isTouchable, isTabletOrLess } = useDevice();
      return {
        relatedTagsAnimation,
        isTouchable,
        isTabletOrLess
      };
    }
  });
</script>
