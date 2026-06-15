<template>
  <MainScrollItem
    :item="result"
    tag="article"
    class="xds:group/result xds:flex xds:flex-col xds:gap-4"
    data-wysiwyg="result"
    :data-wysiwyg-id="result.id"
    :data-wysiwyg-image-url="result.images ? result.images[0] : ''"
    :data-wysiwyg-title="result.name"
  >
    <div class="xds:relative">
      <slot name="product-image">
        <BaseResultLink :result="result">
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

      <slot v-if="showAddToCart" name="add-to-cart">
        <div
          class="x-result__overlay xds:invisible xds:absolute xds:bottom-0 xds:flex xds:w-full xds:flex-col xds:gap-16 xds:bg-neutral-0 xds:p-8 xds:group-hover/result:visible xds:desktop:p-16"
        >
          <BaseAddToCart
            :result="result"
            class="xds:button xds:min-h-32 xds:w-full xds:flex-auto xds:border-none xds:bg-lead xds:px-16 xds:text-md xds:font-regular xds:text-neutral-0 xds:hover:bg-lead-dark"
          >
            {{ t('result.addToCart') }}
          </BaseAddToCart>
        </div>
      </slot>
    </div>

    <slot v-if="showDescription" name="product-info">
      <BaseResultLink
        class="xds:flex xds:flex-col xds:gap-8 xds:p-8 xds:pb-16 xds:desktop:gap-4 xds:desktop:p-16 xds:desktop:pb-24"
        :result="result"
      >
        <div class="xds:flex xds:items-center xds:justify-between xds:gap-16 xds:py-8">
          <h2 class="xds:truncate xds:text-md xds:font-bold xds:text-font">
            {{ result.name }}
          </h2>
          <slot name="cta">
            <BaseEventButton
              class="xds:button xds:min-h-min xds:button-ghost xds:p-0 xds:hover:bg-transparent!"
              :events="onWishlistClickEvents"
              @click.stop.prevent
            >
              <HeartIcon
                class="xds:icon-md xds:desktop:icon-lg"
                :class="isWishListed ? 'xds:fill-lead' : 'xds:hover:fill-lead-light'"
              />
            </BaseEventButton>
          </slot>
        </div>
        <div class="xds:flex xds:gap-8">
          <BaseResultCurrentPrice
            :result="result"
            class="xds:text-md xds:font-semibold xds:text-font"
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
  showDescription: {
    type: Boolean,
    default: true,
  },
  showAddToCart: {
    type: Boolean,
    default: true,
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
</script>
