<template>
  <BaseSlider
    v-model="selectedRange"
    :threshold="threshold"
    class="x-price-slider x-flex x-pb-24"
    content-class="x-bg-neutral-15 x-h-8 x-my-16 !x-px-12 x-border-none"
  >
    <div class="x-flex x-flex-grow x-justify-between x-gap-8">
      <div class="x-flex x-flex-col">
        <div
          class="x-flex x-h-[40px] x-w-[165px] x-rounded-sm x-border-[1.4px] x-border-neutral-90 x-pl-16 x-pr-16 desktop:x-w-[184px]"
        >
          <input
            class="x-my-8 x-max-w-[80px] x-text-center placeholder:x-text-neutral-75"
            name="min"
            type="number"
            :value="Math.floor(selectedRange.min)"
            :aria-label="$t(`facets.editableNumberControls.min`)"
            placeholder="0"
            @change="selectedRange.min = ($event.target as HTMLInputElement)?.valueAsNumber"
          />
        </div>
      </div>

      <div class="x-flex x-flex-col">
        <div
          class="x-flex x-h-[40px] x-w-[165px] x-rounded-sm x-border-[1.4px] x-border-neutral-90 x-pl-16 x-pr-16 desktop:x-w-[184px]"
        >
          <input
            class="x-my-8 x-max-w-[80px] x-text-center placeholder:x-text-neutral-75"
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

<style lang="scss">
.x-price-slider {
  .noUi-connect {
    background: theme('colors.lead.50');
    height: 4px;
  }
  .x-base-slider__nouislider {
    height: 4px;
  }
}

.x-price-slider {
  .noUi-handle {
    height: 24px;
    width: 24px;
    top: -10px;
    right: -12px; /* half the width */
    background: theme('colors.lead.50');
    box-shadow: none;
    clip-path: circle(50%);
    border: none;
  }
}
</style>
