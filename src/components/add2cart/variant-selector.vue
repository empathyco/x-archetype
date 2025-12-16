<template>
  <BaseEventsModal
    class="x-variant-selector-modal !x-z-[999]"
    :class="{ 'x-variant-selector-modal--mobile': isMobileOrLess }"
    :events-to-open-modal="eventsToOpenVariantsModal"
    :events-to-close-modal="eventsToCloseVariantsModal"
    @focusin.stop
  >
    <div
      class="x-variant-selector-modal-content x-relative x-flex x-max-h-[calc(100%-4rem)] x-min-w-[320px] x-max-w-[732px] x-flex-col x-gap-24 x-rounded-t-md x-bg-neutral-0"
      :class="isMobileOrLess ? 'x-p-12 x-pt-32' : 'x-rounded-b-md x-p-32'"
      @click="hideTooltip"
    >
      <div class="x-flex x-flex-row x-gap-24">
        <BaseEventButton
          :events="{ UserClickedCloseModal: undefined }"
          class="x-absolute x-right-0 x-top-0 x-m-8 x-rounded-full"
        >
          <CrossIcon />
        </BaseEventButton>
        <div class="x-flex x-w-[182px] x-min-w-[144px] x-justify-center">
          <div class="x-relative x-flex x-h-full x-w-full x-justify-center">
            <BaseResultImage
              v-if="result"
              :result="result"
              :show-next-image-on-hover="true"
              class="outline-none x-w-[150px]"
            >
              <template #placeholder>
                <BasePlaceholderImage />
              </template>
              <template #fallback>
                <BaseFallbackImage />
              </template>
            </BaseResultImage>

            <div
              class="x-result__overlay x-absolute x-bottom-0 x-flex x-w-full x-flex-col x-items-end"
            >
              <div
                v-if="showTooltip && missingOptions"
                class="x-absolute x-bottom-full x-left-0 x-z-10 x-mb-8 x-w-max x-max-w-[190px] x-rounded-md x-bg-auxiliary-50 x-py-4 x-text-xs x-text-neutral-10"
                @click.stop
              >
                <div class="x-text-center">{{ $t('result.selectAllOptions') }}</div>
              </div>

              <button
                v-if="units === 0"
                class="x-text-2 x-button x-button-lead x-button-sm x-ml-auto x-h-[35px] x-w-[35px] x-rounded-full x-px-12 hover:x-bg-lead-50"
                @click.stop="add2cart"
              >
                <span> <PlusIcon /> </span>
              </button>

              <div
                v-else-if="units > 0"
                class="x-border-neutral-30 x-flex x-h-[35px] x-w-full x-items-center x-justify-between x-rounded-full x-border-b x-border-t x-bg-neutral-0"
              >
                <button
                  class="x-border-lead-30 x-bg-lead-30 hover:x-border-lead-30 hover:x-bg-lead-30 x-button x-button-sm x-h-[35px] x-w-[35px] x-rounded-full"
                  @click="removeUnit"
                >
                  <MinusIcon class="x-icon x-icon-stroke-width-lg x-text-lead-50" />
                </button>

                <div
                  class="focus:outline-none x-text2 x-text2-sm x-flex x-h-full x-w-full x-appearance-none x-flex-col x-items-center x-justify-center x-font-bold x-text-neutral-90"
                  @click="enableEditing"
                >
                  <span
                    v-if="!isEditing"
                    class="w-full"
                    :class="{ 'x-text-error-50': hasMaxUnitsReached }"
                  >
                    {{ units }}
                  </span>
                  <input
                    v-else
                    ref="inputRef"
                    v-model.number="inputUnits"
                    :aria-label="inputUnits.toString()"
                    autocomplete="off"
                    inputmode="numeric"
                    type="tel"
                    step="1.2"
                    :max="maxInputValue"
                    class="x-w-full x-text-center"
                    :class="{ 'x-text-error-50': hasMaxUnitsReached }"
                    placeholder=""
                    @blur="updateUnits(Number(($event.target as HTMLInputElement)?.value))"
                    @focus="clearInputValue"
                    @keyup.enter="updateUnits(Number(($event.target as HTMLInputElement)?.value))"
                  />
                  <span
                    v-if="hasMaxUnitsReached"
                    class="x-title4 x-mt-[-6px] x-text-center x-text-[8px] x-font-bold x-text-error-50"
                  >
                    {{ $t('result.maxUnits') }}
                  </span>
                </div>

                <button
                  class="x-bg-lead-30 hover:x-bg-lead-30 x-button x-button-sm x-h-[35px] x-w-[35px] x-rounded-full x-border-lead-50 hover:x-border-lead-50"
                  :class="{ 'x-bg-neutral-30 x-border-none': hasMaxUnitsReached }"
                  :disabled="hasMaxUnitsReached"
                  @click="addUnit"
                >
                  <PlusIcon
                    class="x-icon x-icon-stroke-width-lg x-text-lead-50"
                    :class="{ 'x-text-neutral-50': hasMaxUnitsReached }"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="x-flex x-max-w-[640px] x-flex-col x-justify-start x-gap-4 x-pr-16">
          <h2
            class="x-line-clamp-3 x-flex x-leading-xs x-text-neutral-100"
            :class="isMobileOrLess ? 'x-text1 x-text1-sm x-font-bold' : 'x-title4 x-pb-8'"
            data-test="result-title"
          >
            {{ result?.name }}
          </h2>
          <div
            class="x-text1 x-line-clamp-2 x-flex x-leading-xs x-text-neutral-100"
            :class="isMobileOrLess ? 'x-h-[30px] x-text-xxs' : 'x-text1-sm'"
          >
            {{ result?.description }}
          </div>

          <div class="x-flex x-flex-wrap x-gap-8">
            <BaseResultCurrentPrice
              v-if="result"
              :result="result"
              class="x-title2 x-title2-sm x-flex x-font-bold x-leading-xs"
              :class="{ 'x-text-auxiliary-90': result?.price?.hasDiscount }"
            />
            <BaseResultPreviousPrice
              v-if="result"
              :result="result"
              class="x-text-neutral-65 x-text1 x-flex x-items-center x-text-[10px] x-leading-xs x-line-through"
            />
          </div>

          <BaseResultLink v-if="result" :result="result" class="x-flex">
            <span
              class="x-text-auxiliary-90 x-text1 x-text1-sm x-line-clamp-2 x-leading-xs x-underline"
            >
              {{ $t('result.viewDetails') }}
            </span>
          </BaseResultLink>

          <div v-if="!isMobileOrLess">
            <div
              v-for="variant in variantOptions"
              :key="variant.name"
              class="x-mb-8 x-flex x-flex-col x-gap-4"
            >
              <h2
                class="x-text-neutral-40 x-text1 x-text1-sm x-line-clamp-3 x-flex x-leading-xs"
                data-test="result-title"
              >
                <span>{{ variant.name }}</span>
                <span v-if="selection[variant.name]">: {{ selection[variant.name] }}</span>
                <span v-else-if="missingOptions" class="x-pl-4 x-text-error-75">
                  {{ $t('result.selectOption') }}
                </span>
              </h2>
              <div class="x-flex x-shrink x-flex-row x-flex-wrap x-gap-8">
                <button
                  v-for="(value, index) in variant.values"
                  :key="value"
                  class="hover:x-border-neutral-70 x-button x-button-sm x-button-ghost x-h-40 x-min-w-fit x-rounded-sm x-border-neutral-25 x-px-16 hover:x-bg-neutral-0"
                  :class="{
                    '!x-border-auxiliary-90 x-border-2':
                      selection[variant.name] && selection[variant.name] === value,
                    'x-h-fit x-px-4': variant.name === 'Color',
                  }"
                  @click="clickedOptionValue(variant, value)"
                >
                  <img
                    v-if="variant.name === 'Color' && variant.images"
                    :src="variant.images[index]"
                    alt="Color variant image"
                    class="x-h-[56px] x-w-[63px]"
                  />
                  <span v-else class="x-text1 x-text-md x-font-bold x-leading-xs">{{ value }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isMobileOrLess">
        <div
          v-for="variant in variantOptions"
          :key="variant.name"
          class="x-mb-8 x-flex x-flex-col x-gap-4"
        >
          <h2
            class="x-text-neutral-40 x-text1 x-text1-sm x-line-clamp-3 x-flex x-leading-xs"
            data-test="result-title"
          >
            <span>{{ variant.name }}</span>
            <span v-if="selection[variant.name]">: {{ selection[variant.name] }}</span>
            <span v-else-if="missingOptions" class="x-pl-4 x-text-error-75">
              {{ $t('result.selectOption') }}
            </span>
          </h2>
          <div class="x-flex x-shrink x-flex-row x-flex-wrap x-gap-8">
            <button
              v-for="(value, index) in variant.values"
              :key="value"
              class="hover:x-border-neutral-70 x-button x-button-sm x-button-ghost x-h-40 x-min-w-fit x-rounded-sm x-border-neutral-25 x-px-16 hover:x-bg-neutral-0"
              :class="{
                '!x-border-auxiliary-90 x-border-2':
                  selection[variant.name] && selection[variant.name] === value,
                'x-h-fit x-px-4': variant.name === 'Color',
              }"
              @click="clickedOptionValue(variant, value)"
            >
              <img
                v-if="variant.name === 'Color' && variant.images"
                :src="variant.images[index]"
                alt="Color variant image"
                class="x-h-[56px] x-w-[63px]"
              />
              <span v-else class="x-text1 x-text-md x-font-bold x-leading-xs">{{ value }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseEventsModal>
</template>

<script setup lang="ts">
import type { SnippetConfig, XEventsTypes } from '@empathyco/x-components'
import type { Result } from '@empathyco/x-types'
import type { ComputedRef, Ref } from 'vue'
import {
  BaseEventButton,
  BaseEventsModal,
  BaseFallbackImage,
  BasePlaceholderImage,
  BaseResultCurrentPrice,
  BaseResultImage,
  BaseResultLink,
  BaseResultPreviousPrice,
  CrossIcon,
  MinusIcon,
  PlusIcon,
  use$x,
  useGetter,
  XPlugin,
} from '@empathyco/x-components'
import { computed, inject, nextTick, ref, watch } from 'vue'
import { useDevice } from '../../composables/use-device.composable'

const eventsToOpenVariantsModal: (keyof XEventsTypes)[] = ['UserClickedResultWithVariants']
const eventsToCloseVariantsModal: (keyof XEventsTypes)[] = [
  'UserClickedOutOfEventsModal',
  'UserClickedCloseModal',
]

const x = use$x()
const { isMobileOrLess } = useDevice()
const { request: searchRequest } = useGetter('search')

const snippetConfig = inject<SnippetConfig>('snippetConfig')

const inputRef = ref<HTMLInputElement | null>(null)
const missingOptions = ref(false)
const showTooltip = ref(false)
const result = ref<Result | undefined>(undefined)
const rawVariants: Ref<any[]> = ref([])
const selection: Ref<Record<string, string | undefined>> = ref({})

const inputUnits = ref(0)
const isEditing = ref(false)

const maxInputValue = computed(() =>
  Math.min(result.value?.maxSale ?? 0, result.value?.availableQuantity ?? 0),
)

const hasMaxUnitsReached = computed(
  () => result.value?.isOutOfStock || inputUnits.value >= maxInputValue.value,
)

const variantOptions: ComputedRef<any[]> = computed(() => {
  const allVariations = rawVariants.value?.flatMap((result: any) => result.variations || [])
  return mergeVariationsByName(allVariations)
})

const allOptionsSelected = computed(() => Object.values(selection.value).every(Boolean))

const itemSelected = computed(() =>
  allOptionsSelected.value
    ? rawVariants.value.find(variant => doesSelectionMatchVariant(variant))
    : undefined,
)

const cart = computed<Record<string | number, any>>(() => snippetConfig?.cart ?? {})
const units = computed(() => (itemSelected.value ? (cart.value[itemSelected.value.id] ?? 0) : 0))

/** Activa el modo edición y enfoca automáticamente el input. */
const enableEditing = (): void => {
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const validUnits = (value: number): number => {
  return value > maxInputValue.value ? maxInputValue.value : value
}

watch(units, (currentUnits, oldUnits) => {
  if (currentUnits !== oldUnits) {
    inputUnits.value = validUnits(currentUnits)
  }
})

/* Limit input to `maxInputValue`. */
watch(inputUnits, () => {
  if (inputUnits.value >= maxInputValue.value) {
    inputUnits.value = maxInputValue.value
  }
})

const clearInputValue = (e: FocusEvent): void => {
  ;(e.target as HTMLInputElement).value = ''
}

const updateUnits = (newValue: number): number => {
  if (Number.isNaN(newValue)) {
    inputUnits.value = units.value
    return units.value
  }

  const maxInput = Math.min(result.value?.maxSale ?? 0, result.value?.availableQuantity ?? 0)
  const value = Math.min(newValue, maxInput)

  if (value === 0 && units.value !== 0) {
    x.emit('UserClickedResultVariantRemoveFromCart', itemSelected.value, { inputValue: 0 })
  } else if (value !== units.value) {
    x.emit(
      value < units.value
        ? 'UserClickedResultVariantRemoveFromCart'
        : 'UserClickedResultVariantAddToCart',
      itemSelected.value,
      { inputValue: value },
    )
  }

  inputUnits.value = value
  isEditing.value = false
  return inputUnits.value
}

/**
 * Adds the selected variant to the cart if all options are selected.
 * Emits an event with the selected variant.
 */
const add2cart = () => {
  if (!allOptionsSelected.value) {
    missingOptions.value = true
    showTooltip.value = true
    return
  } else {
    missingOptions.value = false
    showTooltip.value = false
  }

  if (itemSelected.value) {
    x.emit('UserClickedResultVariantAddToCart', itemSelected.value)
  }
}

/**
 * Adds an unit to the selected variant from the cart.
 * Emits an event with the selected variant.
 */
const addUnit = () => {
  x.emit('UserClickedResultVariantAddToCart', itemSelected.value)
}

/**
 * Removes an unit to the selected variant from the cart.
 * Emits an event with the selected variant.
 */
const removeUnit = () => {
  x.emit('UserClickedResultVariantRemoveFromCart', itemSelected.value)
}

const hideTooltip = () => {
  showTooltip.value = false
}

watch(
  () => variantOptions.value,
  newVariantOptions => {
    if (newVariantOptions) {
      selection.value = Object.fromEntries(
        variantOptions.value.map(variant => [variant.name, undefined]),
      )
    }
  },
)

// Listen for the event when a user clicks on a result with variants
x.on('UserClickedResultWithVariants', true).subscribe(({ eventPayload }) => {
  result.value = eventPayload

  XPlugin.adapter
    .skuSearch({ ...searchRequest.value, query: result.value?.id ?? '' })
    .then((response: any) => {
      rawVariants.value = response?.results || []
    })
    .catch((e: Error) => {
      console.error('Error fetching variants:', e)
    })
})

eventsToCloseVariantsModal?.forEach(event =>
  x.on(event, false).subscribe(() => {
    showTooltip.value = false
    missingOptions.value = false
    result.value = undefined
    rawVariants.value = []
  }),
)

/**
 * Merges variations by their names, ensuring that each name has a unique set of values.
 *
 * @param variations Array of variations to merge.
 * @returns Merged variations with unique values for each name.
 */
function mergeVariationsByName(variations: any[]) {
  const merged: Record<string, { values: string[]; images?: string[] }> = {}
  variations.forEach(variation => {
    if (!merged[variation.name]) {
      merged[variation.name] = { values: [] }
    }
    merged[variation.name].values.push(...variation.values)

    // Add images for the "Color" variation
    if (variation.name === 'Color' && result.value?.images?.[0]) {
      merged[variation.name].images = [result.value.images[0]]
    }
  })
  return Object.entries(merged).map(([name, { values, images }]) => ({
    name,
    values: Array.from(new Set(values)), // Avoid duplicates
    ...(images ? { images } : {}), // Include images if present
  }))
}

/**
 * Checks if the current selection matches a given variant.
 *
 * @param variant
 */
function doesSelectionMatchVariant(variant: any) {
  return Object.entries(selection.value).every(
    ([name, value]) =>
      value === undefined ||
      variant.variations?.some((v: any) => v.name === name && v.values.includes(value)),
  )
}

/**
 * Handles the click on a variant option value.
 * Updates the selection and checks if only one matching variant is found.
 *
 * @param variant The variant being clicked.
 * @param value The value of the variant option being selected.
 */
function clickedOptionValue(variant: any, value: string) {
  selection.value[variant.name] = selection.value[variant.name] !== value ? value : undefined

  // Iterate over rawVariants to find items that has the current selection
  const matchingVariants = rawVariants.value.filter(variant => doesSelectionMatchVariant(variant))

  // If only one matching variant is found, select the other variation
  if (matchingVariants.length === 1) {
    const otherVariant = matchingVariants[0].variations.find((v: any) => v.name !== variant.name)
    if (otherVariant) {
      selection.value[otherVariant.name] = otherVariant.values[0] ?? undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.x-variant-selector-modal {
  &.x-modal {
    justify-content: center;
    align-items: center;

    .x-modal__content {
      background: transparent;
      justify-content: center;
      align-items: center;
    }
  }
}

.x-variant-selector-modal--mobile {
  .x-modal__content {
    position: absolute;
    bottom: 0;
    padding: 0 4px;
  }
}
</style>
