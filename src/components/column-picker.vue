<template>
  <div class="xds:flex xds:items-center xds:gap-8">
    <span class="xds:title4" data-test="column-picker-message">{{
      t('columnPicker.message')
    }}</span>
    <BaseColumnPickerList
      :columns="columns"
      button-class="xds:button xds:button-circle xds:button-sm xds:button-ghost xds:ps-0 xds:pe-0"
    >
      <template #divider>
        <span class="xds:mx-8 xds:button-group-divider xds:text-neutral-25" />
      </template>
      <template #default="{ column }: { column: number }">
        <component :is="icons[column]" class="xds:icon-lg" />
      </template>
    </BaseColumnPickerList>
  </div>
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
import { useI18n } from 'vue-i18n'
import { useDevice } from '../composables/use-device.composable'
import { useExperienceControls } from '../composables/use-experience-controls.composable'
import GridListIcon from './icons/grid-list-icon.vue'

const { t } = useI18n()
const { isMobile } = useDevice()
const { getControlFromPath } = useExperienceControls()

const gridConfig = getControlFromPath<{ columnSelector: number[]; listMode: boolean }>('gridConfig')
const columnSelector = computed(() => gridConfig.value?.columnSelector.map(Number))

const columns = computed(() => {
  if (isMobile.value) {
    return [2, 1]
  }
  if (gridConfig.value.listMode) {
    return [...columnSelector.value, 1] // asume that 1 won't be set in columnSelector when listMode is active
  }
  return columnSelector.value
})

const icons = computed<Record<number, Component>>(() => {
  // Filter out single-column mode to find the minimum multi-column value
  const multiColumnOptions = columns.value.filter(columnCount => columnCount !== 1)
  const minMultiColumnCount = Math.min(...multiColumnOptions)

  return Object.fromEntries(
    columns.value.map(columnCount => {
      // Single column mode: show list icon or single column icon based on device/mode
      if (columnCount === 1) {
        const isSingleColumnMode = isMobile.value || !gridConfig.value.listMode
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
