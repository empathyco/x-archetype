<template>
  <BaseSlider
    v-model="selectedRange"
    :threshold="threshold"
    class="x-price-slider xds:flex xds:pb-24"
    content-class="xds:bg-neutral-15 xds:h-8 xds:my-16 xds:px-12! xds:border-none"
  >
    <div class="xds:flex xds:grow xds:justify-between xds:gap-8">
      <div class="xds:flex xds:flex-col">
        <div
          class="xds:flex xds:h-40 xds:rounded-sm xds:border-[1.4px] xds:border-neutral-90 xds:pr-16 xds:pl-16"
          :class="{ 'xds:w-41.25 xds:desktop:w-46': facetsPanelOverlay }"
        >
          <input
            class="xds:my-8 xds:max-w-80 xds:text-center xds:placeholder:text-neutral-75"
            name="min"
            type="number"
            :value="Math.floor(selectedRange.min)"
            :aria-label="$t(`facets.editableNumberControls.min`)"
            placeholder="0"
            @change="selectedRange.min = ($event.target as HTMLInputElement)?.valueAsNumber"
          />
        </div>
      </div>

      <div class="xds:flex xds:flex-col">
        <div
          class="xds:flex xds:h-40 xds:rounded-sm xds:border-[1.4px] xds:border-neutral-90 xds:pr-16 xds:pl-16"
          :class="{ 'xds:w-41.25 xds:desktop:w-46': facetsPanelOverlay }"
        >
          <input
            class="xds:my-8 xds:max-w-80 xds:text-center xds:placeholder:text-neutral-75"
            name="max"
            type="number"
            :value="Math.floor(selectedRange.max)"
            :aria-label="$t(`facets.editableNumberControls.max`)"
            placeholder="0"
            @change="selectedRange.max = ($event.target as HTMLInputElement)?.valueAsNumber"
          />
        </div>
      </div>
    </div>
  </BaseSlider>
</template>

<script setup lang="ts">
import type { EditableNumberRangeFilter } from '@empathyco/x-types'
import type { PropType } from 'vue'
import { BaseSlider, use$x, useState } from '@empathyco/x-components'
import { ref, watch } from 'vue'
import { useExperienceControls } from '../../../composables/use-experience-controls.composable'

const props = defineProps({
  priceFilter: {
    type: Object as PropType<EditableNumberRangeFilter>,
    required: true,
  },
  selectedFilter: {
    type: Object as PropType<EditableNumberRangeFilter>,
    default: undefined,
  },
})

const x = use$x()
const { stats } = useState('search')
const { getControlFromPath } = useExperienceControls()
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')

const selectedRange = ref({
  min: props.selectedFilter?.range?.min ?? Math.floor(stats.value.price.min!),
  max: props.selectedFilter?.range?.max ?? Math.floor(stats.value.price.max!),
})
const threshold = ref({
  min: Math.floor(stats.value.price.min!),
  max: Math.floor(stats.value.price.max!),
})

/**
 * Resets values of selected range to the threshold values.
 */
function resetSelectedRange(): void {
  selectedRange.value.min = threshold.value.min
  selectedRange.value.max = threshold.value.max
}

x.on('UserClickedClearAllFilters', false).subscribe(resetSelectedRange)

watch(
  () => props.selectedFilter,
  filter => {
    if (!filter) {
      selectedRange.value.min = threshold.value.min ?? 0
      selectedRange.value.max = threshold.value.max ?? 100
    }
  },
)

watch([() => selectedRange.value.min, () => selectedRange.value.max], () => {
  x.emit('UserModifiedEditableNumberRangeFilter', {
    ...props.priceFilter,
    range: {
      min: Math.floor(selectedRange.value.min),
      max: Math.floor(selectedRange.value.max),
    },
  })
})
</script>

<style>
.x-price-slider .x-base-slider__nouislider {
  height: 4px;
}

.x-price-slider .noUi-base {
  .noUi-connect {
    background: var(--xds-color-lead-50);
    height: 4px;
  }

  .noUi-handle {
    height: 24px;
    width: 24px;
    top: -10px;
    right: -12px; /* half the width */
    background: var(--xds-color-lead-50);
    box-shadow: none;
    clip-path: circle(50%);
    border: none;
  }
}
</style>
