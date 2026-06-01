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

const columns = computed(() =>
  isMobile.value
    ? [2, 1]
    : gridConfig.value.listMode
      ? [...gridConfig.value.columnSelector, 1] // asume that 1 won't be set in columnSelector when listMode is active
      : gridConfig.value.columnSelector,
)

const icons = computed<Record<number, Component>>(() => {
  const nonOneValues = columns.value.filter(v => v !== 1)
  const min = Math.min(...nonOneValues)

  return Object.fromEntries(
    columns.value.map(column => {
      if (column === 1) {
        return [column, isMobile.value || !gridConfig.value.listMode ? Grid1ColIcon : GridListIcon]
      }

      return [column, column === min ? Grid2ColIcon : Grid4ColIcon]
    }),
  )
})
</script>
