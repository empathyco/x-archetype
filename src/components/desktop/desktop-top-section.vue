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
import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'
import { defineAsyncComponent } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import { xControlsState } from '../../x-components/xcontrols'
import DesktopSubHeader from './desktop-sub-header.vue'
const DesktopHeaderFloatingPredictive = defineAsyncComponent(() =>
  import('./desktop-header-floating-predictive.vue').then(m => m.default),
)
const DesktopHeaderFullPredictive = defineAsyncComponent(() =>
  import('./desktop-header-full-predictive.vue').then(m => m.default),
)

const { hasSearched } = useHasSearched()
const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
const isFullPredictiveLayer =
  (controls?.fullPredictiveLayer as boolean) ?? xControlsState.fullPredictiveLayer
</script>
