<template>
  <div v-if="!x.query.searchBox">
    <h1
      v-if="!hasQueryPreviews"
      class="xds:text-xl xds:max-desktop:px-16 xds:max-desktop:text-lg"
      data-test="pre-search-manager-title"
    >
      {{ $t('popularSearches.title') }}
    </h1>
    <PreSearchQueryPreviewList :queries-preview-info="queriesPreviewToRender" />
  </div>
</template>

<script setup lang="ts">
import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import { use$x, useState } from '@empathyco/x-components'
import { popularSearchesXModule } from '@empathyco/x-components/popular-searches'
import { computed, inject } from 'vue'
import PreSearchQueryPreviewList from './pre-search-query-preview-list.vue'

defineOptions({
  xModule: popularSearchesXModule.name,
})

const props = withDefaults(
  defineProps<{
    maxPopularSearchesToRender?: number
  }>(),
  {
    maxPopularSearchesToRender: 4,
  },
)

const { popularSearches } = useState('popularSearches')

const injectedQueriesPreview = inject<QueryPreviewInfo[] | { value: QueryPreviewInfo[] }>(
  'queriesPreviewInfo',
  [],
)

const injectedQueriesPreviewInfo = computed<QueryPreviewInfo[]>(() =>
  'value' in injectedQueriesPreview ? injectedQueriesPreview.value : injectedQueriesPreview,
)

const hasQueryPreviews = computed(() => injectedQueriesPreviewInfo.value.length !== 0)

const queriesPreviewToRender = computed<QueryPreviewInfo[]>(() => {
  const queryPreviewInfo: QueryPreviewInfo[] = popularSearches.value.map(({ query }) => ({
    query,
  }))
  return hasQueryPreviews.value
    ? injectedQueriesPreviewInfo.value
    : queryPreviewInfo.slice(0, props.maxPopularSearchesToRender)
})

const x = use$x()
</script>
