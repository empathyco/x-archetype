<template>
  <LocationProvider v-if="showRelatedPrompts" :location="location">
    <CustomRelatedPrompts
      :related-prompt-list="relatedPrompts"
      :class="x.noResults ? 'xds:desktop:mt-24' : 'xds:mt-48 xds:desktop:mt-32'"
    />
  </LocationProvider>
  <LocationProvider v-if="showSemantics" :location="location">
    <CustomSemanticQueries />
  </LocationProvider>
  <LocationProvider v-if="showPartials" location="results">
    <PartialResults />
  </LocationProvider>
  <LocationProvider v-if="showRecommendations" location="no_results">
    <CustomRecommendations />
  </LocationProvider>
</template>

<script setup lang="ts">
import { LocationProvider, use$x, useState } from '@empathyco/x-components'
import { computed, defineAsyncComponent } from 'vue'
import CustomRelatedPrompts from '../related-prompts/custom-related-prompts.vue'
import CustomRecommendations from '../results/custom-recommendations.vue'
import CustomSemanticQueries from './custom-semantic-queries.vue'
const PartialResults = defineAsyncComponent(() => import('./').then(m => m.PartialResults))

const x = use$x()

const { relatedPrompts } = useState('relatedPrompts')
const { config: semanticQueriesConfig } = useState('semanticQueries')
const { config } = useState('search')

const location = computed(() => (x.results.length > 0 ? 'low_results' : 'no_results'))
const showRecommendations = computed(
  () => x.noResults && !x.partialResults.length && !x.semanticQueries.length,
)

const showPartials = computed(
  () => x.noResults && !x.semanticQueries.length && !relatedPrompts.value?.length,
)

const showSemantics = computed(
  () =>
    x.totalResults > 0 &&
    x.totalResults < semanticQueriesConfig.value.threshold &&
    !relatedPrompts.value?.length,
)

const showRelatedPrompts = computed(
  () => (x.noResults || x.totalResults < config.value?.pageSize) && relatedPrompts.value?.length,
)
</script>
