<template>
  <FallbackResultsMessage
    v-if="showFallbackResultsMessage"
    :key-path="keyPath"
    class="xds:mb-16"
    data-test="no-results-message"
  />
  <LocationProvider v-if="showRelatedPrompts" :location="location">
    <CustomRelatedPrompts
      :related-prompt-list="relatedPrompts"
      :class="x.noResults ? 'xds:desktop:mt-24' : 'xds:mt-48 xds:desktop:mt-32'"
    />
  </LocationProvider>
  <LocationProvider v-if="showSemantics" :location="location">
    <CustomSemanticQueries />
  </LocationProvider>
  <LocationProvider v-if="showPartials" :location="location">
    <PartialResults />
  </LocationProvider>
  <LocationProvider v-if="showRecommendations" :location="location">
    <CustomRecommendations />
  </LocationProvider>
</template>

<script setup lang="ts">
import { LocationProvider, use$x, useState } from '@empathyco/x-components'
import { computed } from 'vue'
import CustomRelatedPrompts from '../related-prompts/custom-related-prompts.vue'
import CustomRecommendations from '../results/custom-recommendations.vue'
import CustomSemanticQueries from './custom-semantic-queries.vue'
import FallbackResultsMessage from './fallback-results-message.vue'
import PartialResults from './results/partial-results.vue'

const x = use$x()

const { relatedPrompts } = useState('relatedPrompts')
const { config } = useState('search')

const keyPath = computed(() => (x.results.length > 0 ? 'lowResults' : 'noResults'))
const location = computed(() => (x.results.length > 0 ? 'low_results' : 'no_results'))
const isLowResults = computed(() => x.totalResults > 0 && x.totalResults < config.value?.pageSize)
const showRecommendations = computed(
  () => x.noResults && !x.partialResults.length && !x.semanticQueries.length,
)

const showPartials = computed(
  () =>
    x.noResults &&
    x.partialResults.length &&
    !x.semanticQueries.length &&
    !relatedPrompts.value?.length,
)

const showSemantics = computed(
  () => (x.noResults || isLowResults.value) && x.semanticQueries.length,
)

const showRelatedPrompts = computed(
  () => (x.noResults || isLowResults.value) && relatedPrompts.value?.length,
)

const showFallbackResultsMessage = computed(
  () =>
    showRelatedPrompts.value ||
    showSemantics.value ||
    showPartials.value ||
    showRecommendations.value,
)
</script>
