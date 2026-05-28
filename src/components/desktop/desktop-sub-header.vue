<template>
  <CollapseHeightAnimation :is-collapsed="hasScrolledPastThreshold">
    <div
      class="xds:layout-item xds:layout-max-width-md xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
    >
      <div
        class="xds:layout-container xds:layout-container-ml-[190px] xds:layout-container-mr-[88px]"
      >
        <div class="xds:layout-item" :class="{ 'xds:grid xds:grid-cols-6': !isFullPredictive }">
          <LocationProvider location="predictive_layer">
            <RelatedTags v-if="x.relatedTags.length > 0" class="xds:pb-24" />
          </LocationProvider>
        </div>
      </div>

      <DesktopToolbar />
    </div>
  </CollapseHeightAnimation>
</template>

<script setup lang="ts">
import { LocationProvider, use$x } from '@empathyco/x-components'
import { useHasScrollPastThreshold } from '../../composables/use-has-scroll-past-threshold.composable'
import CollapseHeightAnimation from '../collapse-height-animation.vue'
import RelatedTags from '../search/related-tags.vue'
import DesktopToolbar from './desktop-toolbar.vue'

defineProps<{
  isFullPredictive?: boolean
}>()

const { hasScrolledPastThreshold } = useHasScrollPastThreshold()
const x = use$x()
</script>
