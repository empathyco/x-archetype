<template>
  <ResultsList v-if="$x.totalResults" v-infinite-scroll:main-scroll>
    <BannersList>
      <PromotedsList>
        <component :is="grid" :columns="2" class="x-grid" :animation="staggeredFadeAndSlide">
          <template #result="{ item: result }">
            <Result :result="result" data-test="search-grid-result" />
          </template>
          <template #banner="{ item: banner }">
            <MainScrollItem :item="banner" tag="article">
              <Banner :banner="banner" />
            </MainScrollItem>
          </template>
          <template #promoted="{ item: promoted }">
            <MainScrollItem :item="promoted" tag="article">
              <Promoted :promoted="promoted" />
            </MainScrollItem>
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
    infiniteScroll,
    StaggeredFadeAndSlide
  } from '@empathyco/x-components';
  import { MainScrollItem } from '@empathyco/x-components/scroll';
  import {
    Banner,
    BannersList,
    Promoted,
    PromotedsList,
    ResultsList
  } from '@empathyco/x-components/search';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from '../../results/result.vue';

  @Component({
    components: {
      Banner,
      BannersList,
      BaseGrid,
      BaseVariableColumnGrid,
      MainScrollItem,
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
