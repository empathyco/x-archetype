<template>
  <MainScrollItem
    :item="result"
    tag="article"
    class="x-result x-group/result x-flex x-flex-col x-gap-4"
  >
    <div class="x-relative">
      <BaseResultLink class="x-result__picture" :result="result">
        <BaseResultImage :result="result" :loadAnimation="imageAnimation" showNextImageOnHover>
          <template #placeholder>
            <BasePlaceholderImage />
          </template>
          <template #fallback>
            <BaseFallbackImage />
          </template>
        </BaseResultImage>
      </BaseResultLink>

      <div
        v-if="isDesktopOrGreater && showAddToCart"
        class="x-result__overlay x-invisible x-absolute x-bottom-0 x-flex x-w-full group-hover/result:x-visible"
      >
        <BaseAddToCart :result="result" class="x-button-lead x-m-16 x-flex-auto x-rounded-full">
          {{ $t('result.addToCart') }}
        </BaseAddToCart>
      </div>
    </div>

    <BaseResultLink
      class="x-result__description x-flex x-flex-col x-gap-2 desktop:x-gap-4"
      :result="result"
    >
      <h2 class="x-title4 x-truncate x-uppercase" data-test="result-title">
        {{ result.description }}
      </h2>
      <template v-if="showDescription">
        <span class="x-text2">{{ result.collection }}</span>
        <span class="x-text2 x-text-lead-50">{{ result.brand }}</span>
      </template>
      <div class="x-flex x-flex-wrap x-gap-8">
        <BaseResultCurrentPrice :result="result" class="x-text2 x-text2-lg x-font-bold" />
        <BaseResultPreviousPrice
          :result="result"
          class="x-text2 x-leading-[1.7] x-text-neutral-75 x-line-through"
        />
      </div>
    </BaseResultLink>
  </MainScrollItem>
</template>

<script lang="ts">
  import {
    BaseAddToCart,
    BaseFallbackImage,
    BasePlaceholderImage,
    BaseResultCurrentPrice,
    BaseResultImage,
    BaseResultLink,
    BaseResultPreviousPrice,
    CrossFade
  } from '@empathyco/x-components';
  import { MainScrollItem } from '@empathyco/x-components/scroll';
  import { Result } from '@empathyco/x-types';
  import { defineComponent, PropType } from 'vue';
  import { useDevice } from '../../composables/use-device.composable';

  export default defineComponent({
    components: {
      BaseAddToCart,
      BaseFallbackImage,
      BasePlaceholderImage,
      BaseResultCurrentPrice,
      BaseResultPreviousPrice,
      BaseResultImage,
      BaseResultLink,
      MainScrollItem
    },
    props: {
      result: { type: Object as PropType<Result>, required: true },
      showDescription: { type: Boolean, default: true },
      showAddToCart: { type: Boolean, default: true }
    },
    setup() {
      const { isDesktopOrGreater } = useDevice();
      return {
        isDesktopOrGreater,
        imageAnimation: CrossFade
      };
    }
  });
</script>
