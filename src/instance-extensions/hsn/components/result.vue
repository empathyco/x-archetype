<template>
  <BaseResult
    :result
    :show-description
    :show-add-to-cart="false"
    class="xds:gap-0! xds:rounded-md xds:border-2 xds:border-neutral-10"
  >
    <template #product-info>
      <div class="xds:flex xds:flex-col xds:gap-8 xds:p-8 xds:desktop:gap-4 xds:desktop:py-16">
        <BaseResultLink :result="result">
          <div class="xds:flex xds:items-center xds:justify-between xds:gap-16 xds:py-8">
            <h2
              class="xds:line-clamp-2 xds:text-[16px] xds:font-semibold xds:text-font xds:capitalize"
            >
              {{ result.name }}
            </h2>
            <div
              class="xds:flex xds:items-center xds:gap-2 xds:text-md xds:font-semibold xds:text-font"
            >
              <StarIcon />
              <div>{{ result.rating?.value ?? 4.9 }}</div>
            </div>
          </div>
        </BaseResultLink>
        <div class="xds:flex xds:flex-wrap xds:items-center xds:gap-8">
          <BaseResultLink :result="result">
            <BaseResultCurrentPrice
              :result="result"
              class="xds:text-lg xds:font-bold xds:text-auxiliary-50"
            />
            <BaseResultPreviousPrice
              :result="result"
              class="xds:text-md xds:text-font xds:line-through"
            />
          </BaseResultLink>
          <BaseAddToCart
            :result="result"
            class="xds:ml-auto xds:button xds:min-h-32 xds:w-full xds:max-w-[60px] xds:flex-auto xds:border-none xds:bg-lead xds:px-16 xds:text-md xds:font-regular xds:text-neutral-0 xds:hover:bg-lead-dark"
          >
            <BagIcon />
          </BaseAddToCart>
        </div>
      </div>
    </template>
  </BaseResult>
</template>

<script setup lang="ts">
import type { Result } from '@empathyco/x-types'
import {
  BaseAddToCart,
  BaseResultCurrentPrice,
  BaseResultLink,
  BaseResultPreviousPrice,
} from '@empathyco/x-components'
import BaseResult from '../../../components/results/base-result.vue'
import BagIcon from './icons/bag-icon.vue'
import StarIcon from './icons/star-icon.vue'

interface Props {
  result: Result
  showDescription?: boolean
  showAddToCart?: boolean
}

withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
})
</script>

<style></style>
