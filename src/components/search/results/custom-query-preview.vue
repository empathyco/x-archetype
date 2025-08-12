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
    <div class="x-mb-40 x-flex x-flex-col x-gap-2 desktop:x-mb-64 desktop:x-gap-16">
      <h1 class="x-title1 x-text-neutral-90 max-desktop:x-title1-sm max-desktop:x-px-16">
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
              class="x-button x-button-lead x-button-tight x-title3 x-title3-sm desktop:x-title3-md max-desktop:x-px-16"
            >
              {{ queryPreviewInfo.query }}
              ({{ totalResults }})
              <ArrowRightIcon class="x-icon-lg" />
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
            <div class="x-transform-style-3d x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
              <Result
                v-for="result in results"
                :key="result.id"
                :result="result"
                class="x-w-[calc(38vw-16px)] x-min-w-[142px] desktop:x-w-[216px]"
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

defineOptions({
  name: 'CustomQueryPreview',
})

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
