<template>
  <SlidingPanel
    v-if="x.relatedTags.length"
    class="xds:sliding-panel-show-buttons-on-hover"
    button-class="xds:button xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
    scroll-container-class="xds:desktop:sliding-panel-fade"
    :show-buttons="!isTouchable"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="xds:icon-lg" />
    </template>
    <RelatedTags
      class="xds:gap-8 xds:pl-16 xds:tablet:pl-24 xds:desktop:pl-0"
      :highlight-curated="true"
      :animation="relatedTagsAnimation"
      item-class="xds:tag-outlined xds:rounded-full"
    >
      <template #related-tag-content="{ relatedTag, isSelected, shouldHighlightCurated }">
        <CuratedCheckIcon v-if="shouldHighlightCurated" />
        {{ relatedTag.tag }}
        <CrossTinyIcon v-if="isSelected" />
        <PlusIcon v-else />
      </template>
    </RelatedTags>
    <template #sliding-panel-right-button>
      <ChevronRightIcon class="xds:icon-lg" />
    </template>
  </SlidingPanel>
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CrossTinyIcon,
  CuratedCheckIcon,
  PlusIcon,
  SlidingPanel,
  StaggeredFadeAndSlide,
  use$x,
} from '@empathyco/x-components'
import { RelatedTags } from '@empathyco/x-components/related-tags'
import { useDevice } from '../../composables/use-device.composable'

const relatedTagsAnimation = StaggeredFadeAndSlide as any
const { isTouchable } = useDevice()
const x = use$x()
</script>
