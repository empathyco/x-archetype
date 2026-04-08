<template>
  <QueryPreviewList
    v-if="queriesPreviewInfo"
    v-slot="{ queryPreviewInfo, totalResults, results, queryTagging }"
    :debounce-time-ms="250"
    :queries-preview-info="queriesPreviewInfo"
    :persist-in-cache="true"
    :query-feature="queryFeature"
    data-wysiwyg="query-previews"
  >
    <div class="xds:mb-40 xds:flex xds:flex-col xds:gap-2 xds:desktop:mb-64 xds:desktop:gap-16">
      <h1 class="xds:title1 xds:text-neutral-90 xds:max-desktop:px-16 xds:max-desktop:title1-sm">
        {{ queryPreviewInfo.title }}
      </h1>
      <DisplayEmitter
        :payload="getToolingTagging(queryPreviewInfo, 'toolingDisplayTagging')"
        :event-metadata="{
          feature: 'related_prompts',
          displayOriginalQuery: x.query.searchBox,
        }"
      >
        <CustomSlidingPanel>
          <template #header>
            <QueryPreviewButton
              :query-preview-info="queryPreviewInfo"
              :metadata="metadata"
              class="xds:button xds:button-tight xds:button-lead xds:title3 xds:title3-sm xds:max-desktop:px-16 xds:desktop:title3-md"
            >
              {{ queryPreviewInfo.query }}
              ({{ totalResults }})
              <ArrowRightIcon class="xds:icon-lg" />
            </QueryPreviewButton>
          </template>
          <DisplayClickProvider
            :result-feature="
              'query-preview' as unknown as 'search' /* TODO add query-preview to Result feature or change the string */
            "
            :query-tagging="queryTagging"
            :tooling-display-tagging="
              getToolingTagging(queryPreviewInfo, 'toolingDisplayClickTagging')
            "
            :tooling-add2-cart-tagging="
              getToolingTagging(queryPreviewInfo, 'toolingDisplayAdd2CartTagging')
            "
          >
            <div class="xds:flex xds:gap-16 xds:pt-16 xds:transform-style-3d xds:max-desktop:px-16">
              <Result
                v-for="result in results"
                :key="result.id"
                :result="result"
                class="xds:w-[calc(38vw-16px)] xds:min-w-35.5 xds:desktop:w-54"
              />
            </div>
          </DisplayClickProvider>
        </CustomSlidingPanel>
      </DisplayEmitter>
    </div>
  </QueryPreviewList>
</template>

<script setup lang="ts">
import type { QueryFeature } from '@empathyco/x-components'
import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import type { RelatedPromptNextQuery, TaggingRequest } from '@empathyco/x-types'
import {
  ArrowRightIcon,
  DisplayClickProvider,
  DisplayEmitter,
  use$x,
  useState,
} from '@empathyco/x-components'
import { QueryPreviewButton, QueryPreviewList } from '@empathyco/x-components/queries-preview'
import CustomSlidingPanel from '../../custom-sliding-panel.vue'
import Result from '../../results/result.vue'

interface Props {
  queryFeature?: QueryFeature
  queriesPreviewInfo?: QueryPreviewInfo[]
}

const props = withDefaults(defineProps<Props>(), {
  queryFeature: 'customer',
  queriesPreviewInfo: () => [],
})

const { relatedPrompts, selectedPrompt } = useState('relatedPrompts')
const getToolingTagging = (
  queryPreviewInfo: QueryPreviewInfo,
  toolingTagging: string,
): TaggingRequest => {
  if (relatedPrompts.value.length) {
    const nextQuery: Record<string, any> =
      relatedPrompts.value[selectedPrompt.value]?.relatedPromptNextQueries?.find(
        (nextQuery: RelatedPromptNextQuery) => nextQuery.query === queryPreviewInfo.query,
      ) ?? {}
    return nextQuery[toolingTagging]
  }
  return {} as TaggingRequest
}

const metadata = { feature: props.queryFeature }
const x = use$x()
</script>
