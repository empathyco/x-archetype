<template v-if="suggestion.selectedFilters.length > 0">
  <p
    v-if="suggestion.selectedFilters.length < 4"
    class="x-text1-sm x-text-neutral-75 x-line-clamp-1"
  >
    <span
      v-for="filter in suggestion.selectedFilters"
      :key="filter.id"
      class="x-mr-8 x-rounded-full x-bg-neutral-10 x-px-8 x-py-2"
    >
      {{ filter.label }}
    </span>
  </p>
  <i18n
    v-else-if="suggestion.selectedFilters.length >= 4"
    tag="p"
    path="myHistory.filters"
    class="x-text1-sm x-text-lead-50"
  >
    <template #firstFilter>{{ suggestion.selectedFilters[0].label }}</template>
    <template #totalFilters>+{{ suggestion.selectedFilters.length - 1 }}</template>
  </i18n>
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
