<template>
  <SortDropdown
    :items="sortValues"
    :animation="animation"
    data-test="sort-dropdown-button"
    class="xds:z-3"
  >
    <template #toggle="{ isOpen }">
      <div
        class="xds:button xds:button-ghost xds:gap-8 xds:button-lead xds:font-normal xds:text-neutral-90"
      >
        <span>{{ $t('sort.label') }}</span>
        <span class="xds:font-bold xds:text-lead-75">
          {{ $t(`sort.values.${x.selectedSort || 'default'}`) }}
        </span>
        <ChevronUpIcon v-if="isOpen" class="xds:text-lead-100 xds:icon-lg" />
        <ChevronDownIcon v-else class="xds:text-lead-100 xds:icon-lg" />
      </div>
    </template>

    <template #item="{ isSelected, item }">
      <div
        class="xds:text-neutral-85 xds:filter-facet xds:bg-neutral-0 xds:px-16 xds:hover:bg-neutral-10 xds:hover:text-neutral-100"
        :class="{ 'xds:bg-neutral-25': isSelected }"
      >
        <span class="xds:text2 xds:text2-sm">{{ $t(`sort.values.${item || 'default'}`) }}</span>
      </div>
    </template>
  </SortDropdown>
</template>

<script setup lang="ts">
import type { Sort } from '@empathyco/x-types'
import { AnimateScale, ChevronDownIcon, ChevronUpIcon, use$x } from '@empathyco/x-components'
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
