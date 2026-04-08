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
        class="xds:my-64 xds:text-center xds:title1 xds:title1-md"
      >
        {{ $t('semanticQueries.title', { query: x.query.search }) }}
      </h1>
      <QueryPreviewList
        v-slot="{ queryPreviewInfo: { query }, results, totalResults }"
        :queries-preview-info="queries.map(q => ({ query: q }))"
        class="xds:flex xds:flex-col xds:gap-64"
        data-wysiwyg="query-previews"
      >
        <CustomSlidingPanel>
          <template #header>
            <SemanticQuery
              :suggestion="findSemanticQuery(query)"
              class="xds:button xds:button-tight xds:button-neutral xds:max-desktop:px-16"
            >
              {{ query }}
              ({{ totalResults }})
              <ArrowRightIcon class="xds:icon-lg" />
            </SemanticQuery>
          </template>
          <DisplayClickProvider result-feature="semantic_recommendations">
            <div class="xds:flex xds:gap-16 xds:pt-16 xds:max-desktop:px-16">
              <Result
                v-for="result in results.slice(0, resultsPerCarousel)"
                :key="result.id"
                :result="result"
                class="xds:w-[calc(38vw-16px)] xds:desktop:w-54"
              />
            </div>
          </DisplayClickProvider>
        </CustomSlidingPanel>
      </QueryPreviewList>
    </section>
  </SemanticQueries>
</template>

<script setup lang="ts">
import { ArrowRightIcon, use$x, useState } from '@empathyco/x-components'
import { QueryPreviewList, useQueriesPreview } from '@empathyco/x-components/queries-preview'
import { SemanticQueries, SemanticQuery } from '@empathyco/x-components/semantic-queries'
import CustomSlidingPanel from '../custom-sliding-panel.vue'
import Result from '../results/result.vue'
import DisplayClickProvider from './display-click-provider.vue'

const { isAnyQueryLoadedInPreview } = useQueriesPreview()
const { config: semanticQueriesConfig } = useState('semanticQueries')

const resultsPerCarousel = semanticQueriesConfig.value.maxItemsToRequest
const x = use$x()
</script>
