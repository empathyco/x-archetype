<template>
  <MainScrollItem
    :item="result"
    tag="article"
    class="x-result x-group/result xds:flex xds:flex-col xds:gap-4"
    data-wysiwyg="result"
    :data-wysiwyg-id="result.id"
    :data-wysiwyg-image-url="result.images ? result.images[0] : ''"
    :data-wysiwyg-title="result.name"
  >
    <div class="xds:relative">
      <BaseResultLink class="x-result__picture" :result="result">
        <BaseResultImage :result="result" :load-animation="imageAnimation" show-next-image-on-hover>
          <template #placeholder>
            <BasePlaceholderImage />
          </template>
          <template #fallback>
            <BaseFallbackImage />
          </template>
        </BaseResultImage>
      </BaseResultLink>

      <BaseEventButton
        class="xds:absolute xds:top-0 xds:right-0 xds:button xds:h-40 xds:w-40 xds:button-ghost xds:hover:bg-transparent!"
        :events="onWishlistClickEvents"
      >
        <HeartIcon
          class="xds:mt-4 xds:icon-lg xds:hover:fill-red-300"
          :class="{ 'xds:fill-red-500 xds:hover:fill-red-500': isWishListed }"
        />
      </BaseEventButton>

      <div
        v-if="isDesktopOrGreater"
        class="x-result__overlay xds:invisible xds:absolute xds:bottom-0 xds:flex xds:w-full xds:group-hover:visible"
      >
        <BaseEventButton
          v-if="result.hasVariants"
          :events="events"
          class="xds:m-16 xds:button xds:flex-auto xds:rounded-full xds:button-lead xds:uppercase"
        >
          {{ $t('result.seeVariants') }}
        </BaseEventButton>
      </div>
    </div>

    <BaseResultLink
      class="x-result__description xds:flex xds:flex-col xds:gap-2 xds:desktop:gap-4"
      :result="result"
    >
      <h2 class="xds:truncate xds:title4 xds:uppercase" data-test="result-title">
        {{ result.description }}
      </h2>
      <template v-if="showDescription">
        <span class="xds:text2">{{ result.collection }}</span>
        <span class="xds:text2 xds:text-lead-50">{{ result.brand }}</span>
      </template>
      <div class="xds:flex xds:flex-wrap xds:gap-8">
        <BaseResultCurrentPrice
          :result="result"
          :format="currencyFormat"
          class="xds:text2 xds:text2-lg xds:font-bold"
        />
        <BaseResultPreviousPrice
          :result="result"
          :format="currencyFormat"
          class="xds:text2 xds:leading-[1.7] xds:text-neutral-75 xds:line-through"
        />
      </div>
    </BaseResultLink>
    <AddToCart v-if="showAddToCart" :result="result" class="xds:my-4 xds:w-full" />
  </MainScrollItem>
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import type { Result } from '@empathyco/x-types'
import type { ComputedRef } from 'vue'
import {
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
import { useDevice } from '../../composables/use-device.composable'
import AddToCart from './add-to-cart.vue'

interface Props {
  result: Result
  showDescription?: boolean
  showAddToCart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
})

const currencyFormat = inject<ComputedRef<string>>('currencyFormat')!

const events = { UserClickedResultWithVariants: props.result }
const onWishlistClickEvents = { UserClickedResultWishlist: props.result }

const { isDesktopOrGreater } = useDevice()
const imageAnimation = CrossFade

const snippetConfig = inject<SnippetConfig>('snippetConfig')

const isWishListed = computed(() => {
  const wishlist = snippetConfig?.wishlist ?? []
  return wishlist.includes(props.result.id)
})
</script>
