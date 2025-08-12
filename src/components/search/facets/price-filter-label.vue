<template>
  <BasePriceFilterLabel
    :filter="filter"
    :less-than="$t('priceFilter.lessThan')"
    :from-to="$t('priceFilter.fromTo')"
    :from="$t('priceFilter.from')"
  />
</template>

<script setup lang="ts">
import type { NumberRangeFilter } from '@empathyco/x-types'
import { BasePriceFilterLabel } from '@empathyco/x-components'

defineProps<{
  filter: NumberRangeFilter
}>()
</script>
