<template>
  <MainScrollItem :item="result" tag="article" class="x-result">
    <BaseResultLink class="x-result__picture" :result="result">
      <BaseResultImage
        :result="result"
        :animation="imageAnimation"
        class="x-picture--fixed-ratio x-picture--zoom"
      >
        <template #placeholder>
          <BasePlaceholderImage />
        </template>
        <template #fallback>
          <BaseFallbackImage />
        </template>
      </BaseResultImage>
    </BaseResultLink>

    <div
      v-if="$x.device === 'desktop' && showAddToCart"
      class="x-result__overlay x-list x-list--horizontal"
    >
      <BaseAddToCart
        :result="result"
        class="x-list__item--expand x-button--pill x-button--primary x-margin--05"
      >
        {{ $t('result.addToCart') }}
      </BaseAddToCart>
    </div>

    <BaseResultLink
      class="x-result__description x-list x-list--vertical"
      :class="$x.device === 'mobile' ? 'x-list--gap-01' : 'x-list--gap-02'"
      :result="result"
    >
      <h2 class="x-small x-ellipsis x-uppercase" data-test="result-title">
        {{ result.name }}
      </h2>
      <span v-if="showDescription" class="x-text">{{ result.season }}</span>
      <div class="x-list x-list--horizontal x-list--wrap x-list--gap-03">
        <BaseResultCurrentPrice :result="result" class="x-text x-text--bold" format="i.iii,dd? €" />
        <BaseResultPreviousPrice
          :result="result"
          class="x-text x-text--secondary x-text--light x-text--stroke"
        />
      </div>
    </BaseResultLink>
  </MainScrollItem>
</template>

<script lang="ts">
  import { Result } from '@empathyco/x-types';
  import {
    BaseAddToCart,
    BaseResultLink,
    BaseResultImage,
    BaseResultCurrentPrice,
    BaseResultPreviousPrice,
    BasePlaceholderImage,
    BaseFallbackImage,
    CartIcon,
    CrossFade
  } from '@empathyco/x-components';
  import { MainScrollItem } from '@empathyco/x-components/scroll';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      BaseAddToCart,
      BaseFallbackImage,
      BasePlaceholderImage,
      BaseResultCurrentPrice,
      BaseResultPreviousPrice,
      BaseResultImage,
      BaseResultLink,
      CartIcon,
      MainScrollItem
    }
  })
  export default class ResultComponent extends Vue {
    @Prop()
    public result!: Result;

    @Prop({ default: true })
    public showDescription!: boolean;

    @Prop({ default: true })
    public showAddToCart!: boolean;

    protected imageAnimation = CrossFade;
  }
</script>
