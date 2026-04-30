<template>
  <a v-if="logo" href="/" class="x-brand-logo">
    <img :src="logo" alt="Brand logo" class="x-brand-logo__image" />
  </a>
</template>
<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { useExperienceControls } from '../composables/use-experience-controls.composable'

const { getControlFromPath } = useExperienceControls()
const logo = getControlFromPath('logo') as ComputedRef<string>
</script>
<style scoped>
img {
  width: auto;
  max-width: 142px;
}
</style>
