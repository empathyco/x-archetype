<template>
  <SemanticQueries
    v-slot="{
      queries,
      findSemanticQuery,
    }: {
      queries: string[]
      findSemanticQuery: (query: string) => any /* TODO use the real type */
    }"
  >
    <section>
      <h1
        v-if="isAnyQueryLoadedInPreview(queries)"
        class="x-title1 x-title1-md x-my-64 x-text-center"
      >
        {{ $t('semanticQueries.title', { query: x.query.search }) }}
      </h1>
      <QueryPreviewList
        v-slot="{ queryPreviewInfo: { query }, results, totalResults }"
        :queries-preview-info="queries.map(q => ({ query: q }))"
        class="x-flex x-flex-col x-gap-64"
        data-wysiwyg="query-previews"
      >
        <CustomSlidingPanel>
          <template #header>
            <SemanticQuery
              :suggestion="findSemanticQuery(query)"
              class="x-button x-button-neutral x-button-tight max-desktop:x-px-16"
            >
              {{ query }}
              ({{ totalResults }})
              <ArrowRightIcon class="x-icon-lg" />
            </SemanticQuery>
          </template>
          <DisplayClickProvider result-feature="semantic_recommendations">
            <div class="x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
              <Result
                v-for="result in results.slice(0, resultsPerCarousel)"
                :key="result.id"
                :result="result"
                class="x-w-[calc(38vw-16px)] desktop:x-w-[216px]"
              />
            </div>
          </DisplayClickProvider>
        </CustomSlidingPanel>
      </QueryPreviewList>
    </section>
  </SemanticQueries>
</template>

<script lang="ts">
import { ArrowRightIcon, use$x } from '@empathyco/x-components'
import { QueryPreviewList, useQueriesPreview } from '@empathyco/x-components/queries-preview'
import { SemanticQueries, SemanticQuery } from '@empathyco/x-components/semantic-queries'
import { defineComponent } from 'vue'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import CustomSlidingPanel from '../custom-sliding-panel.vue'
import Result from '../results/result.vue'
import DisplayClickProvider from './display-click-provider.vue'

export default defineComponent({
  components: {
    ArrowRightIcon,
    CustomSlidingPanel,
    DisplayClickProvider,
    QueryPreviewList,
    Result,
    SemanticQueries,
    SemanticQuery,
  },
  setup() {
    const { isAnyQueryLoadedInPreview } = useQueriesPreview()
    const { getControlFromPath } = useExperienceControls()

    return {
      isAnyQueryLoadedInPreview,
      resultsPerCarousel: getControlFromPath('semanticQueries.resultsPerCarousels'),
      x: use$x(),
    }
  },
})
</script>
