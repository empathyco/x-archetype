<template>
  <div v-if="filtersList && filtersList.length" class="x-text1-sm x-flex x-gap-8 x-text-lead-50">
    <div class="x-truncate">
      <span v-for="filter in filtersList" :key="filter.id" class="x-pr-8">
        {{ filter.label }}
      </span>
    </div>
    <span>({{ filtersList.length }})</span>
  </div>
</template>

<script lang="ts">
  import { HistoryQuery } from '@empathyco/x-types';
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    props: {
      filtersList: {
        type: Array as PropType<HistoryQuery['selectedFilters']>,
        required: true
      }
    }
  });
</script>
