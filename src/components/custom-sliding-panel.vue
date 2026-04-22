<template>
  <div>
    <template v-if="$slots.header">
      <slot name="header" />
    </template>
    <SlidingPanel
      :show-buttons="!isTouchable"
      :reset-on-content-change="false"
      button-class="xds:button xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="xds:icon-lg" />
      </template>
      <template #sliding-panel-right-button>
        <ChevronRightIcon class="xds:icon-lg" />
      </template>
      <slot />
    </SlidingPanel>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, SlidingPanel } from '@empathyco/x-components'
import { useDevice } from '../composables/use-device.composable'

const { isTouchable } = useDevice()
</script>
