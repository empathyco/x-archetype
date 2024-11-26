<template>
  <ResultsList
    v-if="x.totalResults || x.noResults"
    v-infinite-scroll:main-scroll
    data-wysiwyg="results"
  >
    <PromotedsList>
      <BannersList>
        <NextQueriesList
          :offset="24"
          :frequency="48"
          :max-next-queries-per-group="maxNextQueriesPerGroup"
          :show-only-after-offset="x.partialResults.length > 0"
        >
          <BaseVariableColumnGrid
            class="x-gap-x-16 x-gap-y-32"
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
              <NextQueryPreview :next-query="nextQueries[0]" />
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
  StaggeredFadeAndSlide,
  use$x,
} from '@empathyco/x-components'
import { NextQueriesList } from '@empathyco/x-components/next-queries'
import { MainScrollItem } from '@empathyco/x-components/scroll'
import {
  Banner,
  BannersList,
  Promoted,
  PromotedsList,
  ResultsList,
} from '@empathyco/x-components/search'
import { defineComponent } from 'vue'
import { useDevice } from '../../../composables/use-device.composable'
import { useExperienceControls } from '../../../composables/use-experience-controls.composable'
import Result from '../../results/result.vue'
import NextQueryPreview from './custom-next-query-preview.vue'

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
    ResultsList,
  },
  directives: {
    'infinite-scroll': infiniteScroll,
  },
  setup() {
    const { isMobile } = useDevice()
    const { getControlFromPath } = useExperienceControls()

    return {
      staggeredFadeAndSlide: StaggeredFadeAndSlide,
      columns: isMobile.value ? 2 : 4,
      maxNextQueriesPerGroup: getControlFromPath('nextQueries.maxItems', 1),
      x: use$x(),
    }
  },
})
</script>

<style lang="scss">
.x-base-grid__next-queries-group {
  grid-column-start: 1;
  grid-column-end: -1;
}
</style>
