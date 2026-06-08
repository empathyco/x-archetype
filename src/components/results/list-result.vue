<template>
  <MainScrollItem
    :item="result"
    tag="article"
    class="x-group/result x-result xds:relative xds:grid xds:h-50 xds:grid-cols-12 xds:gap-16 xds:border xds:border-neutral-50 xds:px-20 xds:py-16"
    data-wysiwyg="result"
    :data-wysiwyg-id="result.id"
    :data-wysiwyg-image-url="result.images ? result.images[0] : ''"
    :data-wysiwyg-title="result.name"
  >
    <div class="xds:col-span-3 xds:col-start-1 xds:flex xds:h-20 xds:flex-col">
      <BaseResultLink
        :result="result"
        class="x-result__picture xds:col-span-3 xds:col-start-1 xds:flex xds:w-full xds:justify-center"
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
    </div>

    <div class="xds:col-span-5 xds:col-start-4 xds:flex xds:flex-col xds:gap-12">
      <div class="xds:flex xds:flex-col xds:gap-4">
        <BaseResultLink
          class="x-result__description xds:flex xds:flex-col xds:gap-2 xds:desktop:gap-4"
          :result="result"
        >
          <h2 class="xds:truncate xds:text-md xds:font-bold" data-test="result-title">
            {{ result.description }}
          </h2>
          <template v-if="showDescription">
            <span class="xds:text-md">{{ result.collection }}</span>
            <span class="xds:text-md xds:text-lead-50">{{ result.brand }}</span>
          </template>
        </BaseResultLink>
        <div
          v-if="isDesktopOrGreater"
          class="x-result__overlay xds:invisible xds:absolute xds:bottom-0 xds:flex xds:w-full xds:group-hover:visible"
        >
          <BaseEventButton
            v-if="result.hasVariants"
            :events="events"
            class="xds:m-16 xds:button xds:flex-auto xds:button-lead xds:text-md xds:font-regular"
          >
            {{ $t('result.seeVariants') }}
          </BaseEventButton>
        </div>
      </div>
    </div>

    <div
      class="xds:col-span-4 xds:col-start-9 xds:flex xds:flex-col xds:flex-wrap xds:justify-end xds:gap-8"
    >
      <BaseResultLink
        class="x-result__description xds:flex xds:flex-col xds:gap-2 xds:desktop:gap-4"
        :result="result"
      >
        <div class="xds:flex xds:flex-wrap xds:justify-end xds:gap-8">
          <BaseResultCurrentPrice :result="result" class="xds:text-md xds:font-regular" />
          <BaseResultPreviousPrice
            :result="result"
            class="xds:text-md xds:leading-[1.7] xds:font-regular xds:text-neutral-75 xds:line-through"
          />
        </div>
      </BaseResultLink>
      <BaseAddToCart
        :result="result"
        class="xds:button xds:max-h-40 xds:flex-auto xds:border-none xds:bg-neutral-50 xds:text-md xds:font-regular xds:text-neutral-0 xds:hover:bg-neutral-25"
      >
        {{ $t('result.addToCart') }}
      </BaseAddToCart>
    </div>

    <BaseEventButton
      class="xds:absolute xds:top-16 xds:right-20 xds:button xds:min-h-fit xds:button-ghost xds:p-0 xds:hover:bg-transparent!"
      :events="onWishlistClickEvents"
    >
      <HeartIcon
        class="xds:icon-lg xds:hover:fill-red-300"
        :class="{ 'xds:fill-red-500 xds:hover:fill-red-500': isWishListed }"
      />
    </BaseEventButton>
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
import { useDevice } from '../../composables/use-device.composable'

interface Props {
  result: Result
  showDescription?: boolean
  showAddToCart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showDescription: true,
  showAddToCart: true,
})

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
