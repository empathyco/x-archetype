<template>
  <QueryPreviewList
    v-if="queriesPreviewInfo"
    v-slot="{ queryPreviewInfo, totalResults, results, queryTagging, displayTagging }"
    :debounce-time-ms="250"
    :queries-preview-info="queriesPreviewInfo"
    :persist-in-cache="true"
    :query-feature="queryFeature"
    data-wysiwyg="query-previews"
  >
    <div class="x-mb-40 x-flex x-flex-col x-gap-2 desktop:x-mb-64 desktop:x-gap-16">
      <h1 class="x-title1 max-desktop:x-title1-sm max-desktop:x-px-16">
        {{ queryPreviewInfo.title }}
      </h1>
      <DisplayEmitter
        :payload="displayTagging"
        :event-metadata="{ ...metadata, replaceable: false }"
      >
        <CustomSlidingPanel>
          <template #header>
            <QueryPreviewButton
              :query-preview-info="queryPreviewInfo"
              :metadata="metadata"
              class="x-button x-button-lead x-button-tight max-desktop:x-px-16"
            >
              {{ queryPreviewInfo.query }}
              ({{ totalResults }})
              <ArrowRightIcon class="x-icon-lg" />
            </QueryPreviewButton>
          </template>
          <DisplayClickProvider
            result-feature="brand_recommendations"
            :query-tagging="queryTagging"
          >
            <div class="x-transform-style-3d x-flex x-gap-16 x-pt-16 max-desktop:x-px-16">
              <Result
                v-for="result in results"
                :key="result.id"
                :result="result"
                class="x-w-[calc(38vw-16px)] desktop:x-w-[216px]"
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
import { ArrowRightIcon, DisplayEmitter } from '@empathyco/x-components'
import { QueryPreviewButton, QueryPreviewList } from '@empathyco/x-components/queries-preview'
import CustomSlidingPanel from '../custom-sliding-panel.vue'
import Result from '../results/result.vue'
import DisplayClickProvider from '../search/display-click-provider.vue'

interface Props {
  queryFeature?: QueryFeature
  queriesPreviewInfo?: QueryPreviewInfo[]
}

const props = withDefaults(defineProps<Props>(), {
  queryFeature: 'customer',
  queriesPreviewInfo: () => [],
})

const metadata = { feature: props.queryFeature }
</script>
