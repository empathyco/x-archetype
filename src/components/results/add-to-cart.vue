<template>
  <button
    v-if="isLoading[result.id]"
    class="x-button x-button-sm x-h-[35px] x-rounded-full x-border-neutral-50 x-bg-neutral-50 x-px-[34px]"
  >
    <SpinnerIcon />
  </button>
  <div v-else class="x-flex">
    <BaseAddToCart
      v-if="units === 0"
      :result="result"
      class="x-button x-text2 x-text2-lg x-bottom-0 x-max-h-40 x-flex-auto x-rounded-full x-border-none x-bg-neutral-50 x-text-neutral-0 hover:x-bg-neutral-25"
    >
      {{ $t('result.addToCart') }}
    </BaseAddToCart>
    <div
      v-else-if="units > 0"
      class="x-flex x-h-[40px] x-w-full x-items-center x-justify-between x-rounded-full x-border x-border-neutral-50 x-bg-neutral-0"
    >
      <BaseEventButton
        class="x-button x-button-sm x-ml-4 x-h-[35px] x-w-[35px] x-rounded-full x-border-none x-bg-neutral-0 x-text-neutral-50 hover:x-bg-neutral-25"
        :events="removeUnitEvents"
      >
        <MinusIcon
          v-if="units > 1"
          class="x-icon x-icon-stroke-width-lg x-h-20 x-w-20 x-text-lead-50"
        />
        <TrashIcon v-else class="x-icon-lg" />
      </BaseEventButton>

      <div
        class="focus:outline-none x-text2 x-text2-lg x-flex x-h-full x-w-full x-appearance-none x-flex-col x-items-center x-justify-center x-font-bold x-text-neutral-90"
      >
        <span
          v-if="!isEditing"
          :class="{ 'x-text-error-50': hasMaxUnitsReached }"
          @click="enableEditing"
        >
          {{ inputUnits }}
        </span>
        <div v-else class="x-flex x-items-center x-gap-1">
          <input
            ref="inputRef"
            v-model.number="inputUnits"
            :aria-label="inputUnits.toString()"
            autocomplete="off"
            inputmode="numeric"
            type="tel"
            step="1"
            :max="maximumQuantity"
            class="x-w-[42px] x-text-center"
            :class="{ 'x-text-error-50': hasMaxUnitsReached }"
            placeholder=""
            @blur="updateUnits(Number(($event.target as HTMLInputElement)?.value))"
            @focus="clearInputValue"
            @keyup.enter="updateUnits(Number(($event.target as HTMLInputElement)?.value))"
          />
        </div>
        <span
          v-if="hasMaxUnitsReached"
          class="x-title4 x-mt-[-6px] x-text-center x-text-[8px] x-font-bold x-text-error-50"
        >
          {{ $t('result.maxUnits') }}
        </span>
      </div>

      <BaseAddToCart
        :result="result"
        class="x-button x-button-sm x-mr-4 x-h-[35px] x-w-[35px] x-rounded-full x-border-l x-border-none x-bg-neutral-0 x-text-neutral-50 hover:x-bg-neutral-25"
        :disabled="hasMaxUnitsReached"
        :class="{ 'x-border-none x-bg-neutral-25': hasMaxUnitsReached }"
      >
        <PlusIcon
          class="x-w-22 x-icon x-h-28"
          :class="{ 'x-text-neutral-50': hasMaxUnitsReached }"
        />
      </BaseAddToCart>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SnippetConfig, XEvent } from '@empathyco/x-components'
import type { Result } from '@empathyco/x-types'
import {
  BaseAddToCart,
  BaseEventButton,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  useXBus,
} from '@empathyco/x-components'
import { computed, inject, nextTick, onMounted, provide, ref, watch } from 'vue'
import SpinnerIcon from '../icons/spinner-icon.vue'

const props = defineProps<{
  result: Result
}>()

const defaultMeasurementUnit = 'un'
const xBus = useXBus()
const snippetConfig = inject<SnippetConfig>('snippetConfig')
const isEditing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const isLoading = ref<Record<number | string, boolean>>({})
const inputUnits = ref(1)
const measurementUnit = ref(props.result.measurementUnit ?? defaultMeasurementUnit)
const maximumQuantity = ref(props.result.availableQuantity ?? 100)

const cart = computed<Record<string | number, any>>(() => snippetConfig?.cart ?? {})
const units = computed(() => cart.value[props.result.id] ?? 0)

const extraEventsMetadata = computed(() => ({
  shopperUnit: measurementUnit.value,
}))

provide('cart', cart)
provide('resultAddToCartExtraEventsMetadata', extraEventsMetadata)

/**
 * Event definition for when units are removed from the cart.
 */
const removeUnitEvents = { UserClickedResultRemoveFromCart: props.result }

const hasMaxUnitsReached = computed(() => {
  return inputUnits.value >= (maximumQuantity.value || Infinity)
})

/* Limit input to maximumQuantity. */
watch(inputUnits, () => {
  if (maximumQuantity.value && inputUnits.value > maximumQuantity.value) {
    inputUnits.value = maximumQuantity.value
  }
})

/**
 * Sets loading state for a specified product ID, and resets it after a delay.
 *
 * @param resultId - The ID of the result item to set loading for.
 */
const setIsLoading = (resultId: string | number): void => {
  isLoading.value = { ...isLoading.value, [resultId]: true }
  setTimeout(() => {
    isLoading.value = { ...isLoading.value, [resultId]: false }
  }, 200)
}

/**
 * Subscribes to cart-related events to toggle loading state on interaction.
 */
;['UserClickedResultAddToCart', 'UserClickedResultRemoveFromCart'].forEach(event =>
  xBus.on(event as XEvent, false).subscribe((result: Result) => {
    setIsLoading(result.id)
  }),
)

/**
 * Updates the number of units for a given result item and emits the appropriate event.
 * The inputValue is passed as a part of the event's metadata, this way we can emit
 * the events once and not per unit added.
 *
 * @param value - The new number of units to set.
 * @returns The updated number of units.
 */
const updateUnits = (value: number): number => {
  value = Math.round(value)

  if (Number.isNaN(value)) {
    inputUnits.value = units.value
    return units.value
  }

  if (value === 0 && units.value !== 0) {
    xBus.emit('UserClickedResultRemoveFromCart', props.result, { inputValue: 0 })
  } else if (value !== units.value) {
    xBus.emit(
      value < units.value ? 'UserClickedResultRemoveFromCart' : 'UserClickedResultAddToCart',
      props.result,
      { inputValue: value, shopperUnit: measurementUnit.value },
    )
  }

  inputUnits.value = value
  isEditing.value = false
  return inputUnits.value
}

/**
 * Clears the input field value on focus.
 *
 * @param e
 * @param e.target - The event object from the focus event.
 * @param e.target.value - The event object from the focus event.
 */
const clearInputValue = (e: FocusEvent): void => {
  ;(e.target as HTMLInputElement).value = ''
}

/**
 * Enables editing mode and focuses the input.
 */
const enableEditing = (): void => {
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

onMounted(() => {
  if (units.value > 0) {
    inputUnits.value = units.value
  }
})

watch(units, (currentUnits, oldUnits) => {
  if (currentUnits !== oldUnits) {
    inputUnits.value = currentUnits
  }
})
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>
