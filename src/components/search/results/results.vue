<template>
  <ResultsList
    v-if="x.totalResults || x.noResults"
    v-infinite-scroll:main-scroll
    data-wysiwyg="results"
  >
    <PromotedsList>
      <BannersList>
        <RelatedPromptsList
          :offset="24"
          :max-groups="1"
          :show-only-after-offset="x.totalResults < 50"
        >
          <NextQueriesCta>
            <BaseVariableColumnGrid
              class="x-gap-x-16 x-gap-y-32"
              :animation="staggeredFadeAndSlide"
              :columns="columns"
              data-test="base-grid"
            >
              <template #result="{ item: result }">
                <Result :result="result" data-test="search-grid-result" />
              </template>
              <template #next-queries-cta-group="{ item: { nextQueries } }">
                <LocationProvider
                  v-if="nextQueries.length > 0 && showNextQueries"
                  location="add2cart"
                >
                  <NextQueriesTags />
                </LocationProvider>
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
              <template v-if="!isLowResult" #related-prompts-group>
                <RelatedPrompts class="-x-mb-1 x-mt-24 desktop:x-mt-0" />
                <CustomQueryPreview
                  v-if="selectedPrompt !== -1"
                  :key="queriesPreviewInfo.length"
                  class="x-rounded-b-[12px] x-bg-neutral-10 x-px-8 desktop:x-px-16"
                  :queries-preview-info="queriesPreviewInfo"
                  query-feature="related_prompts"
                ></CustomQueryPreview>
              </template>
            </BaseVariableColumnGrid>
          </NextQueriesCta>
        </RelatedPromptsList>
      </BannersList>
    </PromotedsList>
  </ResultsList>
</template>

<script setup lang="ts">
import type { RelatedPromptNextQuery } from '@empathyco/x-types'
import type { Ref } from 'vue'
import {
  BaseVariableColumnGrid,
  infiniteScroll,
  LocationProvider,
  StaggeredFadeAndSlide,
  use$x,
  useState,
} from '@empathyco/x-components'
import { RelatedPromptsList } from '@empathyco/x-components/related-prompts'
import { MainScrollItem } from '@empathyco/x-components/scroll'
import {
  Banner,
  BannersList,
  Promoted,
  PromotedsList,
  ResultsList,
} from '@empathyco/x-components/search'
import { computed, inject } from 'vue'
import { useDevice } from '../../../composables/use-device.composable'
import RelatedPrompts from '../../related-prompts/related-prompts.vue'
import Result from '../../results/result.vue'
import CustomQueryPreview from './custom-query-preview.vue'
import NextQueriesCta from './next-queries-cta.vue'
import NextQueriesTags from './next-queries-tags.vue'

const x = use$x()
const { isMobile } = useDevice()

const { relatedPrompts, selectedPrompt } = useState('relatedPrompts')

const { config } = useState('search')

const showNextQueries = computed(() => inject<Ref<boolean>>('showNextQueries')?.value)

const columns = computed(() => (isMobile.value ? 2 : 4))

const isLowResult = computed(() => x.totalResults > 0 && x.totalResults < config.value?.pageSize)

const queriesPreviewInfo = computed(() => {
  if (relatedPrompts.value.length) {
    const queries = [] as string[]
    relatedPrompts.value[selectedPrompt.value].relatedPromptNextQueries?.forEach(
      (nextQuery: RelatedPromptNextQuery) => queries.push(nextQuery.query),
    )
    return queries.map(query => ({ query }))
  }
  return []
})

const staggeredFadeAndSlide = StaggeredFadeAndSlide as any

const vInfiniteScroll = infiniteScroll
</script>

<style lang="scss">
.x-base-grid__next-queries-group,
.x-base-grid__next-queries-cta-group {
  grid-column-start: 1;
  grid-column-end: -1;
}
.x-base-grid__next-queries-cta-group:empty {
  display: none;
}
</style>
