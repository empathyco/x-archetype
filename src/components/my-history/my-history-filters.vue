<template v-if="suggestion.selectedFilters.length > 0">
  <div>
    <p class="x-text1-sm x-text-lead-50 x-line-clamp-1">
      <span
        v-for="filter in suggestion.selectedFilters"
        :key="filter.id"
        class="x-history-filters x-pr-8"
      >
        {{ filter.label ?? filter.id }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { HistoryQuery } from '@empathyco/x-types';

  export default defineComponent({
    props: {
      suggestion: { type: Object as PropType<HistoryQuery>, required: true }
    },
    setup(props) {
      return { props };
    }
  });
</script>
