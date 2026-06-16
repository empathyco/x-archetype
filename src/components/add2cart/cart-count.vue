<template>
  <BaseEventButton
    :events="{ UserClickedCartIcon: undefined }"
    class="xds:relative xds:button xds:button-circle xds:button-ghost"
  >
    <BagIcon class="xds:icon-lg" />
    <span
      v-if="productsInCart > 0"
      class="xds:absolute xds:-right-4 xds:h-20 xds:w-20 xds:rounded-full xds:bg-lead xds:font-family-main xds:text-sm xds:font-bold xds:text-neutral-0"
    >
      {{ productsInCart }}
    </span>
  </BaseEventButton>
</template>
<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import { BaseEventButton } from '@empathyco/x-components'
import { computed, inject } from 'vue'
import BagIcon from '../icons/bag-icon.vue'

const snippetConfig = inject<SnippetConfig>('snippetConfig')

/**
 * Gets the number of products in the cart.
 *
 * @returns The number of products in the cart.
 */
const productsInCart = computed(() => {
  return Object.values(snippetConfig?.cart ?? {}).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  )
})
</script>
