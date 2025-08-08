<template>
  <div v-if="filtersWithLabel.length" class="x-text1-sm x-flex x-gap-8 x-text-lead-50">
    <div class="x-truncate">
      <span v-for="filter in filtersWithLabel" :key="filter.id" class="x-pr-8">
        {{ filter.label }}
      </span>
    </div>
    <span v-if="showLength">({{ filtersList.length }})</span>
  </div>
</template>

<script lang="ts">
import type { Filter, HistoryQuery } from '@empathyco/x-types'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

type FilterWithLabel = Filter & { label: string }

export default defineComponent({
  props: {
    filtersList: {
      type: Array as PropType<Exclude<HistoryQuery['selectedFilters'], undefined>>,
      default: () => [],
    },
    showLength: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const filtersWithLabel = computed(() =>
      props.filtersList.filter((f): f is FilterWithLabel => !!(f as FilterWithLabel).label),
    )

    return { filtersWithLabel }
  },
})
</script>
