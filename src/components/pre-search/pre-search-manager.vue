<template>
  <div v-if="!x.query.searchBox && popularSearchesRendered.length">
    <h1
      class="xds:text-xl xds:max-desktop:px-16 xds:max-desktop:text-lg"
      data-test="pre-search-manager-title"
    >
      {{ t('popularSearches.title') }}
    </h1>
    <PreSearchQueryPreviewList :queries-preview-info="popularSearchesRendered" />
  </div>
</template>

<script setup lang="ts">
import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import { use$x, useState } from '@empathyco/x-components'
import { popularSearchesXModule } from '@empathyco/x-components/popular-searches'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
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
const x = use$x()
const { t } = useI18n()
const { popularSearches } = useState('popularSearches')

const popularSearchesRendered = computed<QueryPreviewInfo[]>(() =>
  popularSearches.value
    .map(({ query }) => ({
      query,
    }))
    .slice(0, props.maxPopularSearchesToRender),
)
</script>
