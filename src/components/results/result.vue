<template>
  <article class="x-result">
    <BaseResultLink class="x-result__picture" :result="result">
      <BaseResultImage class="x-picture--colored" :result="result">
        <template #placeholder>
          <div style="padding-top: 100%; background-color: lightgray"></div>
        </template>
        <template #fallback>
          <div style="padding-top: 100%; background-color: lightsalmon"></div>
        </template>
      </BaseResultImage>
    </BaseResultLink>
    <BaseResultLink class="x-result__description x-list x-list--gap-04" :result="result">
      <div class="x-list x-list--gap-02">
        <h1 class="x-small x-text--bold">{{ result.season }}</h1>
        <h2 class="x-text x-text--secondary x-ellipsis">{{ result.name }}</h2>
      </div>
      <BaseResultCurrentPrice
        format="i,iii.dd €"
        :result="result"
        class="x-text x-text--accent x-text--bold"
      />
    </BaseResultLink>
  </article>
</template>

<script lang="ts">
  import { Result } from '@empathy/search-types';
  import { BaseResultLink, BaseResultImage, BaseResultCurrentPrice } from '@empathy/x-components';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      BaseResultCurrentPrice,
      BaseResultImage,
      BaseResultLink
    }
  })
  export default class ResultComponent extends Vue {
    @Prop()
    public result!: Result;
  }
</script>
