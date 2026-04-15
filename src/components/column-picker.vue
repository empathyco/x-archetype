<template>
  <div class="xds:flex xds:items-center xds:gap-8">
    <span class="xds:title4">{{ $t('columnPicker.message') }}</span>
    <BaseColumnPickerList
      :columns="values"
      button-class="xds:button xds:button-circle xds:button-sm xds:button-ghost xds:ps-0 xds:pe-0"
    >
      <template #divider>
        <span class="xds:mx-8 xds:button-group-divider xds:text-neutral-25" />
      </template>
      <template #default="{ column }: { column: 1 | 2 | 4 }">
        <component :is="icons[column]" class="xds:icon-lg" />
      </template>
    </BaseColumnPickerList>
  </div>
</template>

<script setup lang="ts">
import {
  BaseColumnPickerList,
  Grid1ColIcon,
  Grid2ColIcon,
  Grid4ColIcon,
} from '@empathyco/x-components'
import { computed } from 'vue'
import { useDevice } from '../composables/use-device.composable'

const { isMobile } = useDevice()

const columns = computed(() => (isMobile.value ? [2, 1] : [4, 2]))

const values = columns
const icons = { 1: Grid1ColIcon, 2: Grid2ColIcon, 4: Grid4ColIcon }
</script>
