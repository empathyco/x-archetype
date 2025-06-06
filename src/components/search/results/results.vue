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
        </RelatedPromptsList>
      </BannersList>
    </PromotedsList>
  </ResultsList>
</template>

<script lang="ts">
import type { RelatedPromptNextQuery } from '@empathyco/x-types'
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
import RelatedPrompts from '../../related-prompts/related-prompts.vue'
import Result from '../../results/result.vue'
import CustomQueryPreview from './custom-query-preview.vue'

export default defineComponent({
  components: {
    RelatedPrompts,
    Banner,
    BannersList,
    BaseVariableColumnGrid,
    CustomQueryPreview,
    MainScrollItem,
    Promoted,
    PromotedsList,
    RelatedPromptsList,
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

    const { relatedPrompts, selectedPrompt } = useState('relatedPrompts')

    const { config } = useState('search')

    const columns = computed(() => (isMobile.value ? 2 : 4))

    const isLowResult = computed(
      () => x.totalResults > 0 && x.totalResults < config.value?.pageSize,
    )

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
