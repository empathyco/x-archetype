<template>
  <ResultsList v-if="$x.totalResults" v-infinite-scroll:main-scroll>
    <BannersList>
      <PromotedsList>
        <NextQueriesList
          :offset="24"
          :frequency="48"
          :maxNextQueriesPerGroup="$x.device === 'mobile' ? 6 : 12"
        >
          <BaseVariableColumnGrid
            class="x-grid x-padding--top-00"
            :animation="staggeredFadeAndSlide"
          >
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
            <template #next-queries-group="{ item: { nextQueries } }">
              <MobileNextQueryPreview v-if="$x.device === 'mobile'" :nextQuery="nextQueries[0]" />
              <DesktopNextQueryPreview v-else :nextQuery="nextQueries[0]" />
            </template>
          </BaseVariableColumnGrid>
        </NextQueriesList>
      </PromotedsList>
    </BannersList>
  </ResultsList>
</template>

<script lang="ts">
  import {
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
  import { NextQueriesList } from '@empathyco/x-components/next-queries';
  import Result from '../../results/result.vue';
  import DesktopNextQueryPreview from '../../desktop/desktop-next-query-preview.vue';
  import MobileNextQueryPreview from '../../mobile/mobile-next-query-preview.vue';

  @Component({
    components: {
      Banner,
      BannersList,
      BaseVariableColumnGrid,
      DesktopNextQueryPreview,
      MainScrollItem,
      MobileNextQueryPreview,
      NextQueriesList,
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
  }
</script>
