<template>
  <BaseResult
    class="xds:relative xds:border-1 xds:border-neutral-200 xds:after:absolute xds:after:bottom-0 xds:after:left-0 xds:after:h-4 xds:after:w-full xds:after:bg-lead xds:after:content-['']"
    :result="result"
    :show-description
    :show-add-to-cart="false"
  >
    <template #product-image>
      <BaseResultLink :result="result">
        <BaseResultImage :result="result" :load-animation="imageAnimation" show-next-image-on-hover>
          <template #placeholder>
            <BasePlaceholderImage />
          </template>
          <template #fallback>
            <BaseFallbackImage />
          </template>
        </BaseResultImage>
      </BaseResultLink>
      <div class="xds:m-w-[136px] xds:absolute xds:top-0 xds:left-0 xds:h-40">
        <img :src="result.brandImage" alt="brand image" />
      </div>
    </template>
    <template #product-info>
      <BaseResultLink
        class="xds:flex xds:flex-col xds:gap-8 xds:px-16 xds:pb-16 xds:font-family-main xds:desktop:gap-4 xds:desktop:p-16 xds:desktop:pb-24"
        :result="result"
      >
        <div class="xds:flex xds:items-center xds:justify-between xds:gap-16 xds:py-8">
          <h2 class="xds:line-clamp-2 xds:text-md xds:font-bold xds:text-font">
            {{ result.name }}
          </h2>
        </div>
        <span class="xds:text-sm xds:font-bold xds:text-lead">Más Información</span>
      </BaseResultLink>
    </template>
  </BaseResult>
</template>

<script setup lang="ts">
import type { DistriplacResult } from '../types'
import {
  BaseFallbackImage,
  BasePlaceholderImage,
  BaseResultImage,
  BaseResultLink,
  CrossFade,
} from '@empathyco/x-components'
import BaseResult from '../../../components/results/base-result.vue'
withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
})

const imageAnimation = CrossFade

interface Props {
  result: DistriplacResult
  showDescription?: boolean
  showAddToCart?: boolean
}
</script>
