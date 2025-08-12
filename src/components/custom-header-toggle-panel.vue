<template>
  <BaseHeaderTogglePanel
    header-class="x-flex x-w-full x-gap-8 x-py-24"
    :start-collapsed="true"
    :animation="animation"
  >
    <template #header-content="{ open }">
      <slot name="header" />
      <ChevronUpIcon v-if="open" class="x-icon-lg x-ml-auto" />
      <ChevronDownIcon v-else class="x-icon-lg x-ml-auto" />
    </template>
    <slot />
  </BaseHeaderTogglePanel>
</template>

<script setup lang="ts">
import {
  animateScale,
  BaseHeaderTogglePanel,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@empathyco/x-components'

const animation = animateScale()
</script>
