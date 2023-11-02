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

<script>
  import { defineComponent } from 'vue';
  import { HistoryQuery } from '@empathyco/x-components/history-queries';

  export default defineComponent({
    props: {
      suggestion: {
        type: HistoryQuery,
        required: true
      }
    }
  });
</script>

<style scoped></style>
