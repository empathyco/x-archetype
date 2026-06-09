<template>
  <SortDropdown
    :items="sortValues"
    :animation="animation"
    data-test="sort-dropdown-button"
    class="xds:z-3"
  >
    <template #toggle="{ isOpen }">
      <div
        class="xds:button xds:button-ghost xds:gap-8 xds:text-md xds:font-normal xds:text-font xds:hover:text-font-dark"
      >
        <span>{{ $t('sort.label') }}</span>
        <span class="xds:font-bold">
          {{ $t(`sort.values.${x.selectedSort || 'default'}`) }}
        </span>
        <ChevronUpIcon v-if="isOpen" class="xds:icon-lg" />
        <ChevronDownIcon v-else class="xds:icon-lg" />
      </div>
    </template>

    <template #item="{ isSelected, item }">
      <div
        class="xds:filter-facet xds:bg-neutral-0 xds:px-16 xds:text-font xds:hover:text-font-dark"
      >
        <RadioButtonSelectedIcon v-if="isSelected" class="xds:icon-lg" />
        <RadioButtonUnselectedIcon v-else class="xds:icon-lg" />
        <span class="xds:text-md" :class="{ 'xds:font-bold': isSelected }">{{
          $t(`sort.values.${item || 'default'}`)
        }}</span>
      </div>
    </template>
  </SortDropdown>
</template>

<script setup lang="ts">
import type { Sort } from '@empathyco/x-types'
import {
  AnimateScale,
  ChevronDownIcon,
  ChevronUpIcon,
  RadioButtonSelectedIcon,
  RadioButtonUnselectedIcon,
  use$x,
} from '@empathyco/x-components'
import { SortDropdown } from '@empathyco/x-components/search'

const sortValues: Sort[] = ['', 'price asc', 'price desc']
const x = use$x()
const animation = AnimateScale
</script>

<style>
.x-dropdown__items-list {
  text-align-last: start;
  left: 0;
  right: 0;
}
.x-dropdown__item {
  width: 100%;
}
</style>
