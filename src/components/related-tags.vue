<template>
  <SlidingPanel
    v-if="$x.relatedTags.length > 0"
    class="x-sliding-panel--buttons-overflow x-sliding-panel--show-buttons-on-hover"
  >
    <RelatedTags class="x-list--gap-03 x-tag--pill" :animation="relatedTagsAnimation">
      <template #sliding-panel-left-button>
        <ChevronLeftIcon />
      </template>

      <template #related-tag-content="{ relatedTag, isSelected }">
        <CrossTinyIcon v-if="isSelected" />
        <PlusIcon v-else />
        {{ relatedTag.tag }}
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
    StaggeredFadeAndSlide
  } from '@empathy/x-components';
  import { RelatedTags } from '@empathy/x-components/related-tags';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      CrossTinyIcon,
      PlusIcon,
      RelatedTags,
      SlidingPanel
    }
  })
  export default class RelatedTagsComponent extends Vue {
    protected relatedTagsAnimation = StaggeredFadeAndSlide;
  }
</script>
