<template>
  <CustomHeaderTogglePanel data-test="sort">
    <template #header>
      <span class="xds:text-lg xds:font-bold">
        {{ $t('sort.label') }}
      </span>
      <span class="xds:h-min xds:self-center xds:text-md">{{
        $t(`sort.values.${x.selectedSort || 'default'}`)
      }}</span>
    </template>
    <template #default>
      <SortPickerList
        v-if="x.totalResults"
        class="xds:flex xds:flex-col xds:gap-8 xds:pb-24"
        :items="sortValues"
        button-class="xds:filter-facet xds:filter-facet-lg"
      >
        <template #default="{ item, isSelected }">
          <RadioButtonSelectedIcon v-if="isSelected" class="xds:icon-lg" />
          <RadioButtonUnselectedIcon v-else class="xds:icon-lg" />
          <span class="xds:text-md">{{ $t(`sort.values.${item || 'default'}`) }}</span>
        </template>
      </SortPickerList>
    </template>
  </CustomHeaderTogglePanel>
</template>

<script setup lang="ts">
import type { Sort } from '@empathyco/x-types'
import { RadioButtonSelectedIcon, RadioButtonUnselectedIcon, use$x } from '@empathyco/x-components'
import { SortPickerList } from '@empathyco/x-components/search'
import CustomHeaderTogglePanel from '../custom-header-toggle-panel.vue'

// const animation = animateScale()
const sortValues: Sort[] = ['', 'price asc', 'price desc']
const x = use$x()
</script>
