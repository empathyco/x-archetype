<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />
    <LocationProvider location="results">
      <Results />
    </LocationProvider>
    <LocationProvider v-if="showRelatedPrompts" :location="location">
      <CustomRelatedPrompts
        :related-prompt-list="relatedPrompts"
        :class="x.noResults ? 'desktop:x-mt-24' : 'x-mt-48 desktop:x-mt-32'"
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
  </div>
</template>

<script setup lang="ts">
import type { FeatureLocation } from '@empathyco/x-components'
import { LocationProvider, use$x, useState } from '@empathyco/x-components'
import { computed, defineAsyncComponent } from 'vue'
import { useHasSearched } from '../composables/use-has-searched.composable'
import CustomRelatedPrompts from './related-prompts/custom-related-prompts.vue'
import CustomRecommendations from './results/custom-recommendations.vue'
import CustomSemanticQueries from './search/custom-semantic-queries.vue'

defineOptions({
  name: 'MainComponent',
})
const PartialResults = defineAsyncComponent(() => import('./search').then(m => m.PartialResults))
const Redirection = defineAsyncComponent(() => import('./search').then(m => m.Redirection))
const Results = defineAsyncComponent(() => import('./search').then(m => m.Results))

const { hasSearched } = useHasSearched()
const x = use$x()

const { config: semanticQueriesConfig } = useState('semanticQueries')

const { relatedPrompts } = useState('relatedPrompts')

const { config } = useState('search')

const location = computed<FeatureLocation>(() =>
  x.results.length > 0 ? 'low_results' : 'no_results',
)

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
