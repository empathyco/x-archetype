<template>
  <a v-if="logo" href="/" class="x-brand-logo">
    <img :src="logo" alt="Brand logo" class="xds:w-auto xds:!max-w-[142px]" />
  </a>
</template>
<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { useExperienceControls } from '../composables/use-experience-controls.composable'

const { getControlFromPath } = useExperienceControls()
const logo = getControlFromPath('logo') as ComputedRef<string>
</script>
