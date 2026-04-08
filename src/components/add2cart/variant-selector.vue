<template>
  <BaseEventsModal
    class="x-variant-selector-modal xds:z-999!"
    :class="{ 'x-variant-selector-modal--mobile': isMobileOrLess }"
    :events-to-open-modal="eventsToOpenVariantsModal"
    :events-to-close-modal="eventsToCloseVariantsModal"
    @focusin.stop
  >
    <div
      class="x-variant-selector-modal-content xds:relative xds:flex xds:max-h-[calc(100%-4rem)] xds:max-w-183 xds:min-w-320 xds:flex-col xds:gap-24 xds:rounded-t-md xds:bg-neutral-0"
      :class="isMobileOrLess ? 'xds:p-12 xds:pt-32' : 'xds:rounded-b-md xds:p-32'"
      @click="hideTooltip"
    >
      <div class="xds:flex xds:flex-row xds:gap-24">
        <BaseEventButton
          :events="{ UserClickedCloseModal: undefined }"
          class="xds:absolute xds:top-0 xds:right-0 xds:m-8 xds:rounded-full"
        >
          <CrossIcon />
        </BaseEventButton>
        <div class="xds:flex xds:w-45.5 xds:min-w-36 xds:justify-center">
          <div class="xds:relative xds:flex xds:h-full xds:w-full xds:justify-center">
            <BaseResultImage
              v-if="result"
              :result="result"
              :show-next-image-on-hover="true"
              class="outline-none xds:w-37.5"
            >
              <template #placeholder>
                <BasePlaceholderImage />
              </template>
              <template #fallback>
                <BaseFallbackImage />
              </template>
            </BaseResultImage>

            <div
              class="x-result__overlay xds:absolute xds:bottom-0 xds:flex xds:w-full xds:flex-col xds:items-end"
            >
              <div
                v-if="showTooltip && missingOptions"
                class="xds:absolute xds:bottom-full xds:left-0 xds:z-10 xds:mb-8 xds:w-max xds:max-w-47.5 xds:rounded-md xds:bg-auxiliary-50 xds:py-4 xds:text-xs xds:text-neutral-10"
                @click.stop
              >
                <div class="xds:text-center">{{ $t('result.selectAllOptions') }}</div>
              </div>

              <button
                v-if="units === 0"
                class="xds:text-2 xds:ml-auto xds:button xds:h-8.75 xds:button-sm xds:w-8.75 xds:rounded-full xds:button-lead xds:px-12 xds:hover:bg-lead-50"
                @click.stop="add2cart"
              >
                <span> <PlusIcon /> </span>
              </button>

              <div
                v-else-if="units > 0"
                class="xds:border-neutral-30 xds:flex xds:h-8.75 xds:w-full xds:items-center xds:justify-between xds:rounded-full xds:border-t xds:border-b xds:bg-neutral-0"
              >
                <button
                  class="xds:border-lead-30 xds:bg-lead-30 xds:hover:border-lead-30 xds:hover:bg-lead-30 xds:button xds:h-8.75 xds:button-sm xds:w-8.75 xds:rounded-full"
                  @click="removeUnit"
                >
                  <MinusIcon class="xds:icon xds:icon-stroke-width-lg xds:text-lead-50" />
                </button>

                <div
                  class="focus:outline-none xds:text2 xds:text2-sm xds:flex xds:h-full xds:w-full xds:appearance-none xds:flex-col xds:items-center xds:justify-center xds:font-bold xds:text-neutral-90"
                  @click="enableEditing"
                >
                  <span
                    v-if="!isEditing"
                    class="w-full"
                    :class="{ 'xds:text-error-50': hasMaxUnitsReached }"
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
                    class="xds:w-full xds:text-center"
                    :class="{ 'xds:text-error-50': hasMaxUnitsReached }"
                    placeholder=""
                    @blur="updateUnits(Number(($event.target as HTMLInputElement)?.value))"
                    @focus="clearInputValue"
                    @keyup.enter="updateUnits(Number(($event.target as HTMLInputElement)?.value))"
                  />
                  <span
                    v-if="hasMaxUnitsReached"
                    class="xds:-mt-1.5 xds:text-center xds:title4 xds:text-[8px] xds:font-bold xds:text-error-50"
                  >
                    {{ $t('result.maxUnits') }}
                  </span>
                </div>

                <button
                  class="xds:bg-lead-30 xds:hover:bg-lead-30 xds:button xds:h-8.75 xds:button-sm xds:w-8.75 xds:rounded-full xds:border-lead-50 xds:hover:border-lead-50"
                  :class="{ 'xds:bg-neutral-30 xds:border-none': hasMaxUnitsReached }"
                  :disabled="hasMaxUnitsReached"
                  @click="addUnit"
                >
                  <PlusIcon
                    class="xds:icon xds:icon-stroke-width-lg xds:text-lead-50"
                    :class="{ 'xds:text-neutral-50': hasMaxUnitsReached }"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="xds:flex xds:max-w-[640px] xds:flex-col xds:justify-start xds:gap-4 xds:pr-16">
          <h2
            class="xds:line-clamp-3 xds:flex xds:leading-xs xds:text-neutral-100"
            :class="isMobileOrLess ? 'xds:text1 xds:text1-sm xds:font-bold' : 'xds:pb-8 xds:title4'"
            data-test="result-title"
          >
            {{ result?.name }}
          </h2>
          <div
            class="xds:line-clamp-2 xds:flex xds:text1 xds:leading-xs xds:text-neutral-100"
            :class="isMobileOrLess ? 'xds:h-7.5 xds:text-xxs' : 'xds:text1-sm'"
          >
            {{ result?.description }}
          </div>

          <div class="xds:flex xds:flex-wrap xds:gap-8">
            <BaseResultCurrentPrice
              v-if="result"
              :result="result"
              class="xds:flex xds:title2 xds:title2-sm xds:leading-xs xds:font-bold"
              :class="{ 'xds:text-auxiliary-75': result?.price?.hasDiscount }"
            />
            <BaseResultPreviousPrice
              v-if="result"
              :result="result"
              class="xds:text-neutral-65 xds:flex xds:items-center xds:text1 xds:text-xxs xds:leading-xs xds:line-through"
            />
          </div>

          <BaseResultLink v-if="result" :result="result" class="xds:flex">
            <span
              class="xds:line-clamp-2 xds:text1 xds:text1-sm xds:leading-xs xds:text-auxiliary-75 xds:underline"
            >
              {{ $t('result.viewDetails') }}
            </span>
          </BaseResultLink>

          <div v-if="!isMobileOrLess">
            <div
              v-for="variant in variantOptions"
              :key="variant.name"
              class="xds:mb-8 xds:flex xds:flex-col xds:gap-4"
            >
              <h2
                class="xds:text-neutral-40 xds:line-clamp-3 xds:flex xds:text1 xds:text1-sm xds:leading-xs"
                data-test="result-title"
              >
                <span>{{ variant.name }}</span>
                <span v-if="selection[variant.name]">: {{ selection[variant.name] }}</span>
                <span v-else-if="missingOptions" class="xds:pl-4 xds:text-error-75">
                  {{ $t('result.selectOption') }}
                </span>
              </h2>
              <div class="xds:flex xds:shrink xds:flex-row xds:flex-wrap xds:gap-8">
                <button
                  v-for="(value, index) in variant.values"
                  :key="value"
                  class="xds:button xds:h-40 xds:button-sm xds:min-w-fit xds:button-ghost xds:rounded-sm xds:border-neutral-25 xds:px-16 xds:hover:border-neutral-75 xds:hover:bg-neutral-0"
                  :class="{
                    'xds:border-2 xds:border-auxiliary-75!':
                      selection[variant.name] && selection[variant.name] === value,
                    'xds:h-fit xds:px-4': variant.name === 'Color',
                  }"
                  @click="clickedOptionValue(variant, value)"
                >
                  <img
                    v-if="variant.name === 'Color' && variant.images"
                    :src="variant.images[index]"
                    alt="Color variant image"
                    class="xds:h-56 xds:w-15.75"
                  />
                  <span v-else class="xds:text1 xds:text-md xds:leading-xs xds:font-bold">
                    {{ value }}
                  </span>
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
          class="xds:mb-8 xds:flex xds:flex-col xds:gap-4"
        >
          <h2
            class="xds:text-neutral-40 xds:line-clamp-3 xds:flex xds:text1 xds:text1-sm xds:leading-xs"
            data-test="result-title"
          >
            <span>{{ variant.name }}</span>
            <span v-if="selection[variant.name]">: {{ selection[variant.name] }}</span>
            <span v-else-if="missingOptions" class="xds:pl-4 xds:text-error-75">
              {{ $t('result.selectOption') }}
            </span>
          </h2>
          <div class="xds:flex xds:shrink xds:flex-row xds:flex-wrap xds:gap-8">
            <button
              v-for="(value, index) in variant.values"
              :key="value"
              class="xds:button xds:h-40 xds:button-sm xds:min-w-fit xds:button-ghost xds:rounded-sm xds:border-neutral-25 xds:px-16 xds:hover:border-neutral-75 xds:hover:bg-neutral-0"
              :class="{
                'xds:border-2 xds:border-auxiliary-75!':
                  selection[variant.name] && selection[variant.name] === value,
                'xds:h-fit xds:px-4': variant.name === 'Color',
              }"
              @click="clickedOptionValue(variant, value)"
            >
              <img
                v-if="variant.name === 'Color' && variant.images"
                :src="variant.images[index]"
                alt="Color variant image"
                class="xds:h-56 xds:w-15.75"
              />
              <span v-else class="xds:text1 xds:text-md xds:leading-xs xds:font-bold">
                {{ value }}
              </span>
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

<style scoped>
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
