<template>
  <MainScrollItem
    :item="result"
    tag="article"
    class="x-result xds:group/result xds:flex xds:flex-col xds:gap-4"
    data-wysiwyg="result"
    :data-wysiwyg-id="result.id"
    :data-wysiwyg-image-url="result.images ? result.images[0] : ''"
    :data-wysiwyg-title="result.name"
  >
    <div class="xds:relative">
      <slot name="product-image">
        <BaseResultLink class="x-result__picture" :result="result">
          <BaseResultImage
            :result="result"
            :load-animation="imageAnimation"
            show-next-image-on-hover
          >
            <template #placeholder>
              <BasePlaceholderImage />
            </template>
            <template #fallback>
              <BaseFallbackImage />
            </template>
          </BaseResultImage>
        </BaseResultLink>
      </slot>

      <slot name="cta">
        <div
          v-if="!isAdded2Cart"
          class="x-result__overlay xds:invisible xds:absolute xds:bottom-0 xds:flex xds:w-full xds:flex-col xds:gap-16 xds:bg-neutral-0 xds:p-8 xds:group-hover/result:visible xds:desktop:p-16"
        >
          <BaseAddToCart
            :result="result"
            class="xds:button xds:min-h-32 xds:w-full xds:flex-auto xds:border-none xds:bg-lead xds:px-16 xds:text-md xds:font-regular xds:text-neutral-0 xds:hover:bg-lead-75"
          >
            {{ t('result.addToCart') }}
          </BaseAddToCart>
        </div>
        <div
          v-else
          class="x-result__overlay xds:absolute xds:bottom-0 xds:w-full xds:p-8 xds:desktop:p-16"
        >
          <span
            class="xds:pointer-events-none xds:button xds:min-h-32 xds:w-full xds:bg-neutral-100 xds:px-16 xds:text-md xds:font-regular xds:text-neutral-0"
          >
            {{ t('result.addedToCart') }}
          </span>
        </div>

        <span
          class="xds:pointer-events-none xds:absolute xds:top-8 xds:right-8 xds:tag xds:h-6.5 xds:min-h-min xds:border xds:border-lead xds:bg-neutral-0 xds:px-3.5 xds:text-sm xds:font-regular xds:text-lead"
        >
          {{ t('result.new') }}
        </span>
      </slot>
    </div>

    <slot name="product-info">
      <BaseResultLink
        class="x-result__description xds:flex xds:flex-col xds:gap-8 xds:p-8 xds:pb-16 xds:desktop:gap-4 xds:desktop:p-16 xds:desktop:pb-24"
        :result="result"
      >
        <div class="xds:flex xds:items-center xds:justify-between xds:gap-16 xds:py-8">
          <h2 class="xds:truncate xds:text-md xds:font-bold xds:text-neutral-100">
            {{ result.name }}
          </h2>
          <BaseEventButton
            class="xds:button xds:min-h-min xds:button-ghost xds:p-0 xds:hover:bg-transparent!"
            :events="onWishlistClickEvents"
            @click.stop.prevent
          >
            <HeartIcon
              class="xds:icon-md xds:desktop:icon-lg"
              :class="isWishListed ? 'xds:fill-lead' : 'xds:hover:fill-lead-25'"
            />
          </BaseEventButton>
        </div>
        <div class="xds:flex xds:gap-8">
          <BaseResultCurrentPrice
            :result="result"
            class="xds:text-md xds:font-semibold xds:text-neutral-100"
          />
          <BaseResultPreviousPrice
            :result="result"
            class="xds:text-sm xds:text-neutral-50 xds:line-through"
          />
        </div>
      </BaseResultLink>
    </slot>
  </MainScrollItem>
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import type { Result } from '@empathyco/x-types'
import type { PropType } from 'vue'
import {
  BaseAddToCart,
  BaseEventButton,
  BaseFallbackImage,
  BasePlaceholderImage,
  BaseResultCurrentPrice,
  BaseResultImage,
  BaseResultLink,
  BaseResultPreviousPrice,
  CrossFade,
  HeartIcon,
} from '@empathyco/x-components'
import { MainScrollItem } from '@empathyco/x-components/scroll'
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  result: {
    type: Object as PropType<Result>,
    required: true,
  },
})

const { t } = useI18n()

const onWishlistClickEvents = { UserClickedResultWishlist: props.result }
const imageAnimation = CrossFade

const snippetConfig = inject<SnippetConfig>('snippetConfig')

const isWishListed = computed(() => {
  const wishlist = snippetConfig?.wishlist ?? []
  return wishlist.includes(props.result.id)
})

const isAdded2Cart = computed(() => {
  const cart = snippetConfig?.cart ?? {}
  return cart[props.result.id]
})
</script>
