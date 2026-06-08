<template>
  <div>
    <DesktopHeaderFullPredictive v-if="isFullPredictiveLayer" />
    <DesktopHeaderFloatingPredictive v-else />

    <DesktopSubHeader
      v-if="hasSearched"
      data-test="sub-header"
      :is-full-predictive="isFullPredictiveLayer"
      class="xds:layout-item"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import DesktopHeaderFloatingPredictive from './desktop-header-floating-predictive.vue'
import DesktopHeaderFullPredictive from './desktop-header-full-predictive.vue'

const DesktopSubHeader = defineAsyncComponent(() =>
  import('../index-search').then(m => m.DesktopSubHeader),
)

const { hasSearched } = useHasSearched()

const { getControl } = useExperienceControls()
const isFullPredictiveLayer = getControl<boolean>('fullPredictiveLayer')
</script>
