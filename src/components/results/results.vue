<template>
  <ResultsList v-if="$x.totalResults" v-infinite-scroll:main-scroll>
    <BannersList>
      <PromotedsList>
        <component :is="grid" :columns="2" class="x-grid" :animation="staggeredFadeAndSlide">
          <template #result="{ item: result }">
            <Result :result="result" />
          </template>
          <template #banner="{ item: banner }">
            <Banner :banner="banner" />
          </template>
          <template #promoted="{ item: promoted }">
            <Promoted :promoted="promoted" />
          </template>
        </component>
      </PromotedsList>
    </BannersList>
  </ResultsList>
</template>

<script lang="ts">
  import {
    BaseGrid,
    BaseVariableColumnGrid,
    StaggeredFadeAndSlide,
    infiniteScroll
  } from '@empathyco/x-components';
  import {
    Banner,
    BannersList,
    Promoted,
    PromotedsList,
    ResultsList
  } from '@empathyco/x-components/search';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from './result.vue';

  @Component({
    components: {
      Banner,
      BannersList,
      BaseGrid,
      BaseVariableColumnGrid,
      Promoted,
      PromotedsList,
      Result,
      ResultsList
    },
    directives: {
      'infinite-scroll': infiniteScroll
    }
  })
  export default class Results extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;
    protected get grid(): string {
      return this.$x.device === 'mobile' ? 'BaseGrid' : 'BaseVariableColumnGrid';
    }
  }
</script>
