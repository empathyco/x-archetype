<template>
  <BaseIdModalOpen
    data-test="toggle-facets-button"
    modal-id="aside-modal"
    class="x-button-lead x-rounded-full x-px-16"
  >
    <FiltersIcon class="x-icon-lg" />
    <span class="x-uppercase">{{ $t('toggleAside.showAside') }}</span>
    <span
      v-if="x.selectedFilters.length > 0"
      :class="{ 'x-badge-circle': x.selectedFilters.length <= 9 }"
      class="x-badge x-badge-lead"
    >
      {{ x.selectedFilters.length }}
    </span>
  </BaseIdModalOpen>
</template>

<script setup lang="ts">
import { BaseIdModalOpen, FiltersIcon, use$x } from '@empathyco/x-components'

const x = use$x()
</script>
