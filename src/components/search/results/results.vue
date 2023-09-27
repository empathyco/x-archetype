<template>
  <ResultsList v-if="$x.totalResults" v-infinite-scroll:main-scroll>
    <PromotedsList>
      <BannersList>
        <NextQueriesList
          :offset="24"
          :frequency="48"
          :maxNextQueriesPerGroup="1"
          :showOnlyAfterOffset="$x.partialResults.length > 0"
        >
          <BaseVariableColumnGrid
            class="x-gap-y-32 x-gap-x-16"
            :animation="staggeredFadeAndSlide"
            :columns="columns"
            data-test="base-grid"
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
              <NextQueryPreview :nextQuery="nextQueries[0]" />
            </template>
          </BaseVariableColumnGrid>
        </NextQueriesList>
      </BannersList>
    </PromotedsList>
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
  import { defineComponent } from 'vue';
  import { NextQueriesList } from '@empathyco/x-components/next-queries';
  import { useDevice } from '../../../composables/use-device.composable';
  import Result from '../../results/result.vue';
  import NextQueryPreview from './custom-next-query-preview.vue';

  export default defineComponent({
    components: {
      Banner,
      BannersList,
      BaseVariableColumnGrid,
      MainScrollItem,
      NextQueryPreview,
      NextQueriesList,
      Promoted,
      PromotedsList,
      Result,
      ResultsList
    },
    directives: {
      'infinite-scroll': infiniteScroll
    },
    setup() {
      const { isMobile } = useDevice();
      return { staggeredFadeAndSlide: StaggeredFadeAndSlide, columns: isMobile.value ? 2 : 4 };
    }
  });
</script>

<style lang="scss">
  .x-base-grid__next-queries-group {
    grid-column-start: 1;
    grid-column-end: -1;
  }
</style>
