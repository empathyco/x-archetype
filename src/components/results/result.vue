<template>
  <MainScrollItem :item="result" tag="article" class="x-result">
    <BaseResultLink class="x-result__picture" :result="result">
      <BaseResultImage :result="result" class="x-picture--colored">
        <template #placeholder>
          <BasePlaceholderImage />
        </template>
        <template #fallback>
          <BaseFallbackImage />
        </template>
      </BaseResultImage>
    </BaseResultLink>

    <div v-if="$x.device === 'desktop'" class="x-result__overlay x-list x-list--horizontal">
      <BaseAddToCart
        :result="result"
        class="x-list__item--expand x-button--pill x-button--tertiary x-margin--05"
      >
        {{ $t('result.addToCart') }}
      </BaseAddToCart>
    </div>

    <BaseResultLink
      class="x-result__description x-list x-list--vertical"
      :class="$x.device === 'mobile' ? 'x-list--gap-01' : 'x-list--gap-02'"
      :result="result"
    >
      <h1 class="x-small x-uppercase">{{ result.season }}</h1>
      <h2 class="x-text x-ellipsis" data-test="result-title">
        {{ result.name }}
      </h2>
      <div class="x-list x-list--horizontal x-list--gap-04">
        <BaseResultCurrentPrice :result="result" class="x-text x-text--bold" />
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
    CartIcon
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
  }
</script>
