<template>
  <SortDropdown
    :items="sortValues"
    :animation="animation"
    data-test="sort-dropdown-button"
    class="x-z-[3]"
  >
    <template #toggle="{ isOpen }">
      <div class="x-text-neutral-85 x-button x-button-lead x-button-ghost x-gap-8 x-font-normal">
        <span>{{ $t('sort.label') }}</span>
        <span class="x-font-bold x-text-lead-75">
          {{ $t(`sort.values.${x.selectedSort || 'default'}`) }}
        </span>
        <ChevronUpIcon v-if="isOpen" class="x-text-lead-100 x-icon-lg" />
        <ChevronDownIcon v-else class="x-text-lead-100 x-icon-lg" />
      </div>
    </template>

    <template #item="{ isSelected, item }">
      <div
        class="x-text-neutral-85 x-facet-filter x-bg-neutral-0 x-px-16 hover:x-bg-neutral-10 hover:x-text-neutral-100"
        :class="{ 'x-bg-neutral-25': isSelected }"
      >
        <span class="x-text2 x-text2-sm">{{ $t(`sort.values.${item || 'default'}`) }}</span>
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

<style lang="scss">
.x-dropdown__items-list {
  text-align-last: start;
  left: 0;
  right: 0;
}
.x-dropdown__item {
  width: 100%;
}
</style>
