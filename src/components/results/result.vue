<template>
  <MainScrollItem :item="result" tag="article" class="x-result">
    <BaseResultLink class="x-result__picture" :result="result">
      <BaseResultImage :result="result" :loadAnimation="imageAnimation" class="x-picture-zoom">
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
      class="x-result__overlay x-list x-list--horizontal"
    >
      <BaseAddToCart
        :result="result"
        class="x-list__item--expand x-border-radius--20 x-margin--05 x-button-lead"
      >
        {{ $t('result.addToCart') }}
      </BaseAddToCart>
    </div>

    <BaseResultLink
      class="x-result__description x-flex x-flex-col x-gap-2 desktop:x-gap-4"
      :result="result"
    >
      <h2 class="x-ellipsis x-uppercase x-title4" data-test="result-title">
        {{ result.name }}
      </h2>
      <span v-if="showDescription" class="x-text2">{{ result.season }}</span>
      <div class="x-list x-list--horizontal x-list--wrap x-list--gap-03">
        <BaseResultCurrentPrice :result="result" class="x-text2 x-text2-lg x-font-bold" />
        <BaseResultPreviousPrice
          :result="result"
          class="x-line-through x-text2 x-text-neutral-75"
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
  import { defineComponent, PropType, toRefs } from 'vue';
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
    setup(props) {
      const { isDesktopOrGreater } = useDevice();
      return {
        isDesktopOrGreater,
        imageAnimation: CrossFade,
        ...toRefs(props)
      };
    }
  });
</script>
