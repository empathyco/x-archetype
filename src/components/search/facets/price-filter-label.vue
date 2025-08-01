<template>
  <BasePriceFilterLabel
    :filter="filter"
    :less-than="$t('priceFilter.lessThan')"
    :from-to="$t('priceFilter.fromTo')"
    :from="$t('priceFilter.from')"
  />
</template>

<script lang="ts">
import type { NumberRangeFilter } from '@empathyco/x-types'
import type { PropType } from 'vue'
import { BasePriceFilterLabel } from '@empathyco/x-components'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    BasePriceFilterLabel,
  },
  props: {
    filter: {
      type: Object as PropType<NumberRangeFilter>,
      required: true,
    },
  },
})
</script>
