<template>
  <article class="result" style="max-width: 300px">
    <BaseResultLink :result="result">
      <BaseResultImage class="x-picture--colored" :result="result">
        <template #placeholder>
          <div style="padding-top: 100%; background-color: lightgray"></div>
        </template>
        <template #fallback>
          <div style="padding-top: 100%; background-color: lightsalmon"></div>
        </template>
      </BaseResultImage>
    </BaseResultLink>
    <BaseResultLink :result="result">
      <h1 class="x-title3">{{ result.name }}</h1>
    </BaseResultLink>
  </article>
</template>

<script lang="ts">
  import { Result } from '@empathy/search-types';
  import { BaseResultLink, BaseResultImage } from '@empathy/x-components';
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {
      BaseResultLink,
      BaseResultImage
    }
  })
  export default class ResultComponent extends Vue {
    @Prop()
    public result!: Result;
  }
</script>
