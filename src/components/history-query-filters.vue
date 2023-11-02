<template>
  <div
    v-if="suggestion.selectedFilters && suggestion.selectedFilters.length"
    class="x-text1-sm x-flex x-gap-8 x-text-lead-50"
  >
    <div class="x-truncate">
      <span v-for="filter in suggestion.selectedFilters" :key="filter.id" class="x-pr-8">
        {{ filter.label }}
      </span>
    </div>
    <span>({{ suggestion.selectedFilters.length }})</span>
  </div>
</template>

<script lang="ts">
  import { HistoryQuery } from '@empathyco/x-types';
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    props: {
      suggestion: {
        type: Object as PropType<HistoryQuery>,
        required: true
      }
    }
  });
</script>
