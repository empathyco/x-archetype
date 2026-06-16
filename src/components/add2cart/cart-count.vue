<template>
  <BaseEventButton
    :events="{ UserClickedCartIcon: undefined }"
    class="xds:relative xds:button xds:button-circle xds:button-ghost"
  >
    <component :is="bagIcon" class="xds:icon-lg" />
    <span
      v-if="productsInCart > 0"
      data-test="cart-count"
      class="xds:absolute xds:-right-4 xds:badge xds:badge-sm xds:badge-circle xds:bg-lead xds:font-bold"
    >
      {{ productsInCart }}
    </span>
  </BaseEventButton>
</template>
<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import { BaseEventButton } from '@empathyco/x-components'
import { computed, inject } from 'vue'
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'

const snippetConfig = inject<SnippetConfig>('snippetConfig')

const { bagIcon } = useInstanceExtensions()

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
