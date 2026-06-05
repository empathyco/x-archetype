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
import { useState } from '@empathyco/x-components'
import { computed, defineAsyncComponent } from 'vue'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import { defaultXControlsState } from '../../x-components/xcontrols'
import DesktopHeaderFloatingPredictive from './desktop-header-floating-predictive.vue'
import DesktopHeaderFullPredictive from './desktop-header-full-predictive.vue'

const DesktopSubHeader = defineAsyncComponent(() =>
  import('../index-search').then(m => m.DesktopSubHeader),
)

const { hasSearched } = useHasSearched()

const { controls } = useState('experienceControls')
const isFullPredictiveLayer = computed(
  () =>
    (controls.value?.fullPredictiveLayer as boolean) ??
    defaultXControlsState.controls.fullPredictiveLayer,
)
</script>
