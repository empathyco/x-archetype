<template>
  <CollapseHeight>
    <div
      v-show="!hasScrolledPastThreshold"
      class="xds:layout-item xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
      data-test="desktop-sub-header"
    >
      <div
        class="xds:layout-container xds:layout-container-ml-[190px] xds:layout-container-mr-[88px]"
      >
        <div
          class="xds:layout-item"
          :class="[
            { 'xds:grid xds:grid-cols-6': !isFullPredictive },
            ui('subHeader')?.relatedTagsContainer,
          ]"
          data-test="desktop-sub-header-related-tags-container"
        >
          <LocationProvider location="predictive_layer">
            <RelatedTags
              v-if="x.relatedTags.length > 0"
              class="xds:pb-24"
              :class="ui('subHeader')?.relatedTags"
            />
          </LocationProvider>
        </div>
      </div>

      <DesktopToolbar />
    </div>
  </CollapseHeight>
</template>

<script setup lang="ts">
import { CollapseHeight, LocationProvider, use$x } from '@empathyco/x-components'
import { useHasScrollPastThreshold } from '../../composables/use-has-scroll-past-threshold.composable'
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'
import RelatedTags from '../search/related-tags.vue'
import DesktopToolbar from './desktop-toolbar.vue'

defineProps<{
  isFullPredictive?: boolean
}>()

const { hasScrolledPastThreshold } = useHasScrollPastThreshold()
const x = use$x()
const { ui } = useInstanceExtensions()
</script>
