<template>
  <component :is="resultComponent" :result="result" :show-description :show-add-to-cart />
</template>
<script setup lang="ts">
import type { Result } from '@empathyco/x-types'
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'

interface Props {
  result: Result
  showDescription?: boolean
  showAddToCart?: boolean
}

withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
})
const { resultComponent } = useInstanceExtensions()
</script>
