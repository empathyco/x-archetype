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
            <template #related-prompts-group>
              <RelatedPromptsTagList v-if="!isLowResult" class="-x-mb-1 x-mt-24 desktop:x-mt-0" />
              <CustomQueryPreview
                v-if="selectedPrompt !== -1"
                :key="queriesPreviewInfo.length"
                class="x-rounded-b-[12px] x-bg-neutral-10 x-px-8 desktop:x-px-16"
                :queries-preview-info="queriesPreviewInfo"
              ></CustomQueryPreview>
            </template>
          </BaseVariableColumnGrid>
        </RelatedPromptsList>
      </BannersList>
    </PromotedsList>
  </ResultsList>
</template>

<script lang="ts">
import type { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries'
import type { ComputedRef } from 'vue'
import {
  BaseVariableColumnGrid,
  infiniteScroll,
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
import { computed, defineComponent } from 'vue'
import { useDevice } from '../../../composables/use-device.composable'
import { useExperienceControls } from '../../../composables/use-experience-controls.composable'
import RelatedPromptsTagList from '../../related-prompts/related-prompts-tag-list.vue'
import Result from '../../results/result.vue'
import CustomQueryPreview from './custom-query-preview.vue'

export default defineComponent({
  components: {
    Banner,
    BannersList,
    BaseVariableColumnGrid,
    CustomQueryPreview,
    MainScrollItem,
    Promoted,
    PromotedsList,
    RelatedPromptsList,
    RelatedPromptsTagList,
    Result,
    ResultsList,
  },
  directives: {
    'infinite-scroll': infiniteScroll,
  },
  setup() {
    const x = use$x()
    const { isMobile } = useDevice()
    const { getControlFromPath } = useExperienceControls()

    const semanticQueriesConfig = useState('semanticQueries', ['config'])
      .config as ComputedRef<SemanticQueriesConfig>

    const { relatedPrompts, selectedPrompt, selectedQuery } = useState('relatedPrompts', [
      'relatedPrompts',
      'selectedPrompt',
      'selectedQuery',
    ])

    const columns = computed(() => (isMobile.value ? 2 : 4))

    const isLowResult = computed(
      () => x.totalResults > 0 && x.totalResults < semanticQueriesConfig.value.threshold,
    )

    const queriesPreviewInfo = computed(() => {
      const queries = relatedPrompts.value[selectedPrompt.value]?.nextQueries as string[]
      if (selectedQuery.value === -1) {
        return queries.map(query => ({ query }))
      } else {
        return [{ query: queries[selectedQuery.value] }]
      }
    })

    return {
      columns,
      isLowResult,
      maxNextQueriesPerGroup: getControlFromPath('nextQueries.maxItems', 1),
      queriesPreviewInfo,
      selectedPrompt,
      staggeredFadeAndSlide: StaggeredFadeAndSlide,
      x,
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
