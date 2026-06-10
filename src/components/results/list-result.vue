<template>
  <MainScrollItem
    :item="result"
    tag="article"
    class="x-group/result xds:relative xds:grid xds:h-50 xds:grid-cols-12 xds:gap-16 xds:border xds:border-neutral-50 xds:px-20 xds:py-16"
    data-wysiwyg="result"
    :data-wysiwyg-id="result.id"
    :data-wysiwyg-image-url="result.images ? result.images[0] : ''"
    :data-wysiwyg-title="result.name"
  >
    <slot name="product-image">
      <div class="xds:relative xds:col-span-3 xds:col-start-1 xds:flex xds:h-20 xds:flex-col">
        <BaseResultLink
          :result="result"
          class="xds:col-span-3 xds:col-start-1 xds:flex xds:w-full xds:justify-center"
        >
          <BaseResultImage
            :result="result"
            :load-animation="imageAnimation"
            show-next-image-on-hover
            class="xds:h-42"
          >
            <template #placeholder>
              <BasePlaceholderImage />
            </template>
            <template #fallback>
              <BaseFallbackImage />
            </template>
          </BaseResultImage>
        </BaseResultLink>

        <span
          class="xds:absolute xds:top-8 xds:left-8 xds:tag xds:h-6.5 xds:min-h-min xds:border xds:border-lead xds:bg-neutral-0 xds:px-3.5 xds:text-sm xds:font-regular xds:text-lead"
        >
          {{ t('result.new') }}
        </span>
      </div>
    </slot>

    <slot name="product-info">
      <div class="xds:col-span-5 xds:col-start-4 xds:flex xds:flex-col xds:gap-12">
        <div class="xds:flex xds:flex-col xds:gap-4">
          <BaseResultLink
            class="xds:flex xds:flex-col xds:gap-2 xds:desktop:gap-4"
            :result="result"
          >
            <h2
              class="xds:truncate xds:text-md xds:font-bold xds:text-font"
              data-test="result-title"
            >
              {{ result.description }}
            </h2>
            <template v-if="showDescription">
              <span class="xds:text-md xds:text-neutral-75">{{ result.collection }}</span>
              <span class="xds:text-md xds:font-regular xds:text-neutral-75">{{
                result.brand
              }}</span>
            </template>
          </BaseResultLink>
        </div>
      </div>
    </slot>

    <div
      class="xds:col-span-4 xds:col-start-9 xds:flex xds:flex-col xds:flex-wrap xds:justify-end xds:gap-8"
    >
      <slot name="product-price">
        <BaseResultLink class="xds:flex xds:flex-col xds:gap-2 xds:desktop:gap-4" :result="result">
          <div class="xds:flex xds:flex-wrap xds:items-center xds:justify-end xds:gap-8">
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
      <slot name="add-to-cart">
        <BaseAddToCart
          :result="result"
          class="xds:button xds:max-h-40 xds:flex-auto xds:border-none xds:bg-lead xds:text-md xds:font-regular xds:text-neutral-0 xds:hover:bg-lead-75"
        >
          {{ t('result.addToCart') }}
        </BaseAddToCart>
      </slot>
    </div>

    <slot name="cta">
      <BaseEventButton
        class="xds:absolute xds:top-16 xds:right-20 xds:button xds:min-h-min xds:button-ghost xds:p-0 xds:hover:bg-transparent!"
        :events="onWishlistClickEvents"
        @click.stop.prevent
      >
        <HeartIcon
          class="xds:icon-lg"
          :class="isWishListed ? 'xds:fill-lead' : 'xds:hover:fill-lead-25'"
        />
      </BaseEventButton>
    </slot>
  </MainScrollItem>
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import type { Result } from '@empathyco/x-types'
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

interface Props {
  result: Result
  showDescription?: boolean
  showAddToCart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
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
