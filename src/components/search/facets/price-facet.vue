<template>
  <CustomHeaderTogglePanel
    :data-test="facet?.label"
    class="x-border-0 x-border-b x-border-neutral-10"
  >
    <template #header>
      <span class="x-title3">
        {{ setFacetLabel($t(`facets.${facet?.label}`), facet?.label) }}
      </span>
      <FacetSelectedFilters :selected-filters="selectedFilters" />
    </template>
    <template #default>
      <CustomPriceSlider :price-filter="priceFilter" :selected-filter="priceFilterValue" />
    </template>
  </CustomHeaderTogglePanel>
</template>

<script setup lang="ts">
import type { EditableNumberRangeFilter as EditableNumberRangeFilterModel } from '@empathyco/x-types'
import { computed } from 'vue'
import CustomHeaderTogglePanel from '../../custom-header-toggle-panel.vue'
import CustomPriceSlider from './custom-price-slider.vue'
import FacetSelectedFilters from './facet-selected-filters.vue'

const props = defineProps({
  facet: Object,
  selectedFilters: {
    type: Array<EditableNumberRangeFilterModel>,
    required: true,
  },
  setFacetLabel: {
    type: Function,
    required: true,
  },
})

const priceFilter: EditableNumberRangeFilterModel & { label: string } = {
  id: `price:0.0-*`,
  modelName: 'EditableNumberRangeFilter',
  label: `price`,
  facetId: 'price',
  range: {
    min: null,
    max: null,
  },
  selected: false,
}

const priceFilterValue = computed<EditableNumberRangeFilterModel | undefined>(() => {
  return props.selectedFilters?.find(
    (filter: EditableNumberRangeFilterModel) => filter.facetId === 'price',
  )
})
</script>

<style lang="scss" scoped>
/* Remove arrows from number inputs */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
