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
  import type { Filter, HistoryQuery } from '@empathyco/x-types';
  import type { PropType } from 'vue';
import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      filtersList: {
        type: Array as PropType<HistoryQuery['selectedFilters']>,
        required: true,
        default: () => []
      },
      showLength: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    setup(props) {
      return {
        filtersWithLabel: props.filtersList?.filter(
          filter => (filter as Filter & { label?: string }).label
        )
      };
    }
  });
</script>
