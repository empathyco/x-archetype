<template>
  <BaseIdModalOpen
    data-test="toggle-facets-button"
    modalId="aside-modal"
    class="x-button-lead x-rounded-full x-px-16"
  >
    <FiltersIcon class="x-icon-lg" />
    <span>{{ $t('toggleAside.showAside') }}</span>
    <span
      v-if="selectedFilters.length > 0"
      :class="{ 'x-badge-circle': selectedFilters.length <= 9 }"
      class="x-badge x-badge-lead"
    >
      {{ selectedFilters.length }}
    </span>
  </BaseIdModalOpen>
</template>

<script lang="ts">
  import { BaseIdModalOpen, FiltersIcon, useGetter } from '@empathyco/x-components';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { BaseIdModalOpen, FiltersIcon },
    setup() {
      const { selectedFilters } = useGetter('facets', ['selectedFilters']);
      return { selectedFilters };
    }
  });
</script>
