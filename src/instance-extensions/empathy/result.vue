<template>
  <BaseResult :result :show-add-to-cart :show-description />
</template>

<script setup lang="ts">
import type { Result } from '@empathyco/x-types'
import BaseResult from '../../components/results/base-result.vue'

interface Props {
  result: Result
  showDescription?: boolean
  showAddToCart?: boolean
}

withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
})
</script>
