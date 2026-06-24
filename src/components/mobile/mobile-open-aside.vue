<template>
  <BaseIdModalOpen
    data-test="toggle-facets-button"
    modal-id="aside-modal"
    class="xds:button-lead xds:px-16 xds:text-md xds:font-regular"
  >
    <FiltersIcon class="xds:icon-lg" />
    <span>{{ $t('toggleAside.showAside') }}</span>
    <span
      v-if="x.selectedFilters.length > 0"
      class="xds:badge xds:badge-lead"
      :class="[{ 'xds:badge-circle': x.selectedFilters.length <= 9 }, ui('toolbar')?.badge]"
    >
      {{ x.selectedFilters.length }}
    </span>
  </BaseIdModalOpen>
</template>

<script setup lang="ts">
import { BaseIdModalOpen, FiltersIcon, use$x } from '@empathyco/x-components'
import { useInstanceExtensions } from '../../composables/use-instance-extensions.composable'

const x = use$x()
const { ui } = useInstanceExtensions()
</script>
