<template>
  <span
    v-if="selectedFilters.length > 0"
    :class="{ 'x-badge-circle': selectedFilters.length <= 9 }"
    class="x-badge x-badge-auxiliary"
  >
    {{ selectedFilters.length }}
  </span>
</template>

<script lang="ts">
  import type { FacetFilter } from '@empathyco/x-types';
  import type { PropType } from 'vue';
import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      selectedFilters: {
        type: Array as PropType<FacetFilter[]>,
        required: true
      }
    }
  });
</script>
