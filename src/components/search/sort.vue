<template>
  <CustomHeaderTogglePanel data-test="sort" class="x-border-0 x-border-b x-border-neutral-10">
    <template #header>
      <span class="x-title3">
        {{ $t('sort.label') }}
      </span>
      <span>{{ $t(`sort.values.${getSortValueTranslation(x.selectedSort) || 'default'}`) }}</span>
    </template>
    <template #default>
      <SortPickerList
        v-if="x.totalResults"
        class="x-flex x-flex-col x-gap-8 x-pb-24"
        :items="sortValues"
        button-class="x-facet-filter x-facet-filter-lg"
      >
        <template #default="{ item, isSelected }">
          <RadioButtonSelectedIcon v-if="isSelected" class="x-icon-lg" />
          <RadioButtonUnselectedIcon v-else class="x-icon-lg" />
          {{ $t(`sort.values.${getSortValueTranslation(item) || 'default'}`) }}
        </template>
      </SortPickerList>
    </template>
  </CustomHeaderTogglePanel>
</template>

<script setup lang="ts">
import type { Sort } from '@empathyco/x-types'
import { RadioButtonSelectedIcon, RadioButtonUnselectedIcon, use$x } from '@empathyco/x-components'
import { SortPickerList } from '@empathyco/x-components/search'
import { sortPriceId } from '../../x-components/constants'
import CustomHeaderTogglePanel from '../custom-header-toggle-panel.vue'

const sortValues: Sort[] = ['', `${sortPriceId} asc`, `${sortPriceId} desc`]
const x = use$x()

const getSortValueTranslation = (sortItem: Sort) =>
  sortItem.split(' ')[0] === sortPriceId
    ? sortItem.split(' ')[1] === 'asc'
      ? 'price asc'
      : 'price desc'
    : sortItem
</script>

<style lang="scss">
// TODO: Remove when implementing buttonClass prop in the SortList buttons
.x-sort-list__button {
  @apply x-button-ghost;
}
</style>
