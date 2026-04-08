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
    <div class="xds:mb-40 xds:flex xds:flex-col xds:gap-2 xds:desktop:mb-64 xds:desktop:gap-16">
      <h1 class="xds:title1 xds:max-desktop:px-16 xds:max-desktop:title1-sm">
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
              class="xds:button xds:button-tight xds:button-lead xds:max-desktop:px-16"
            >
              {{ queryPreviewInfo.query }}
              ({{ totalResults }})
              <ArrowRightIcon class="xds:icon-lg" />
            </QueryPreviewButton>
          </template>
          <DisplayClickProvider
            result-feature="brand_recommendations"
            :query-tagging="queryTagging"
          >
            <div class="xds:flex xds:gap-16 xds:pt-16 xds:transform-style-3d xds:max-desktop:px-16">
              <Result
                v-for="result in results"
                :key="result.id"
                :result="result"
                class="xds:w-[calc(38vw-16px)] xds:desktop:w-54"
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
