<template>
  <QueryPreviewList
    v-if="queriesPreviewInfo"
    :debounceTimeMs="250"
    :queriesPreviewInfo="queriesPreviewInfo"
    :persistInCache="true"
    :queryFeature="queryFeature"
    data-wysiwyg="query-previews"
    #default="{ queryPreviewInfo, totalResults, results, queryTagging }"
  >
    <div class="x-mb-40 x-flex x-flex-col x-gap-2 desktop:x-mb-64 desktop:x-gap-16">
      <h1 class="x-title1 max-desktop:x-title1-sm max-desktop:x-px-16">
        {{ queryPreviewInfo.title }}
      </h1>
      <CustomSlidingPanel>
        <template #header>
          <QueryPreviewButton
            :queryPreviewInfo="queryPreviewInfo"
            class="x-button x-button-lead x-button-tight max-desktop:x-px-16"
          >
            {{ queryPreviewInfo.query }}
            ({{ totalResults }})
            <ArrowRightIcon class="x-icon-lg" />
          </QueryPreviewButton>
        </template>
        <DisplayClickProvider resultFeature="brand_recommendations" :queryTagging="queryTagging">
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
    </div>
  </QueryPreviewList>
</template>

<script lang="ts">
  import {
    QueryPreviewList,
    QueryPreviewInfo,
    QueryPreviewButton
  } from '@empathyco/x-components/queries-preview';
  import { QueryFeature, ArrowRightIcon } from '@empathyco/x-components';
  import { defineComponent, PropType } from 'vue';
  import { default as Result } from '../results/result.vue';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';
  import DisplayClickProvider from '../search/display-click-provider.vue';

  export default defineComponent({
    name: 'CustomQueryPreview',
    components: {
      CustomSlidingPanel,
      DisplayClickProvider,
      Result,
      ArrowRightIcon,
      QueryPreviewList,
      QueryPreviewButton
    },
    props: {
      queryFeature: {
        type: String as PropType<QueryFeature>,
        default: 'customer'
      },
      queriesPreviewInfo: {
        type: Array as PropType<QueryPreviewInfo[]>,
        default: () => []
      }
    }
  });
</script>
