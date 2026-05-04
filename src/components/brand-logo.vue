<template>
  <a v-if="logo" href="/" class="x-brand-logo">
    <img :src="logo" alt="Brand logo" class="xds:w-auto xds:!max-w-[142px]" />
  </a>
</template>
<script setup lang="ts">
import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'
import { xControlsState } from '../x-components/xcontrols'

const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
const logo = (controls?.logo as string) ?? xControlsState.logo
</script>
