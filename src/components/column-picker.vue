<template>
  <BaseColumnPickerList
    :columns="columns"
    class="xds:gap-8 xds:px-16"
    button-class="xds:button xds:button-tight xds:ps-0 xds:pe-0 xds:text-neutral-25 xds:selected:text-font! xds:hover:text-font!"
  >
    <template #default="{ column }: { column: number }">
      <component :is="icons[column]" class="xds:icon-lg" />
    </template>
  </BaseColumnPickerList>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import {
  BaseColumnPickerList,
  Grid1ColIcon,
  Grid2ColIcon,
  Grid4ColIcon,
} from '@empathyco/x-components'
import { computed } from 'vue'
import { useDevice } from '../composables/use-device.composable'
import { useExperienceControls } from '../composables/use-experience-controls.composable'
import GridListIcon from './icons/grid-list-icon.vue'

const { isMobile } = useDevice()

const { getControl } = useExperienceControls()
const gridConfig = getControl<{ columnSelector: number[]; listMode: boolean }>('gridConfig')
const columnSelector = gridConfig.columnSelector.map(Number)

const columns = computed(() => {
  if (isMobile.value) {
    return [2, 1]
  }
  if (gridConfig.listMode) {
    return [...columnSelector, 1] // asume that 1 won't be set in columnSelector when listMode is active
  }
  return columnSelector
})

const icons = computed<Record<number, Component>>(() => {
  // Filter out single-column mode to find the minimum multi-column value
  const multiColumnOptions = columns.value.filter(columnCount => columnCount !== 1)
  const minMultiColumnCount = Math.min(...multiColumnOptions)

  return Object.fromEntries(
    columns.value.map(columnCount => {
      // Single column mode: show list icon or single column icon based on device/mode
      if (columnCount === 1) {
        const isSingleColumnMode = isMobile.value || !gridConfig.listMode
        const icon = isSingleColumnMode ? Grid1ColIcon : GridListIcon
        return [columnCount, icon]
      }

      // Multi-column mode: use 2-col icon for minimum, 4-col icon for others
      const icon = columnCount === minMultiColumnCount ? Grid2ColIcon : Grid4ColIcon
      return [columnCount, icon]
    }),
  )
})
</script>
