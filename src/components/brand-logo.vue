<template>
  <a v-if="logo" href="/" class="x-brand-logo">
    <img :src="logo" alt="Brand logo" class="xds:w-auto xds:!max-w-[142px]" />
  </a>
</template>
<script setup lang="ts">
import { useState } from '@empathyco/x-components'
import { computed } from 'vue'
import { defaultXControlsState } from '../x-components/xcontrols'

const { controls } = useState('experienceControls')
const logo = computed(() => (controls.value?.logo as string) ?? defaultXControlsState.controls.logo)
</script>
