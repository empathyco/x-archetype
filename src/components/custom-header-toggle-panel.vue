<template>
  <BaseHeaderTogglePanel
    header-class="xds:flex xds:w-full xds:gap-8 xds:py-24"
    :start-collapsed="true"
    :animation="animation"
  >
    <template #header-content="{ open }">
      <slot name="header" />
      <ChevronUpIcon v-if="open" class="xds:ml-auto xds:icon-lg" />
      <ChevronDownIcon v-else class="xds:ml-auto xds:icon-lg" />
    </template>
    <slot />
  </BaseHeaderTogglePanel>
</template>

<script setup lang="ts">
import {
  AnimateScale,
  BaseHeaderTogglePanel,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@empathyco/x-components'

const animation = AnimateScale
</script>
