<template>
  <span
    v-if="selectedFilters.length > 0"
    :class="{ 'x-badge-circle': x.selectedFilters.length <= 9 }"
    class="x-badge x-badge-auxiliary"
  >
    {{ selectedFilters.length }}
  </span>
</template>

<script lang="ts">
  import { FacetFilter } from '@empathyco/x-types';
  import { defineComponent, PropType } from 'vue';
  import { use$x } from '@empathyco/x-components';

  export default defineComponent({
    props: {
      selectedFilters: {
        type: Array as PropType<FacetFilter[]>,
        required: true
      }
    },
    setup() {
      return {
        x: use$x()
      };
    }
  });
</script>
