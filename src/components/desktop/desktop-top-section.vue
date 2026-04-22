<template>
  <div>
    <DesktopHeaderFullPredictive v-if="isFullPredictiveLayer" />
    <DesktopHeaderFloatingPredictive v-else />

    <DesktopSubHeader
      data-test="sub-header"
      :has-searched="hasSearched"
      :is-full-predictive="isFullPredictiveLayer"
      class="xds:layout-item"
    />
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import DesktopSubHeader from './desktop-sub-header.vue'
const DesktopHeaderFloatingPredictive = defineAsyncComponent(() =>
  import('./desktop-header-floating-predictive.vue').then(m => m.default),
)
const DesktopHeaderFullPredictive = defineAsyncComponent(() =>
  import('./desktop-header-full-predictive.vue').then(m => m.default),
)

const { hasSearched } = useHasSearched()
const { getControlFromPath } = useExperienceControls()
const isFullPredictiveLayer = getControlFromPath('fullPredictiveLayer') as ComputedRef<boolean>
</script>
