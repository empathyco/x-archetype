<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />
    <LocationProvider location="results">
      <Results />
    </LocationProvider>
    <AiSearchFallback v-if="showAiSearchFallback" />
    <SearchFallback v-else-if="showSearchFallbacks" />
  </div>
</template>

<script setup lang="ts">
import { LocationProvider, use$x, useState } from '@empathyco/x-components'
import { computed, defineAsyncComponent } from 'vue'
import { useExperienceControls } from '../composables/use-experience-controls.composable'
import { useHasSearched } from '../composables/use-has-searched.composable'
import AiSearchFallback from './ai/ai-search-fallback.vue'
import SearchFallback from './search/search-fallback.vue'

const Redirection = defineAsyncComponent(() => import('./search').then(m => m.Redirection))
const Results = defineAsyncComponent(() => import('./search').then(m => m.Results))

const { getControlFromPath } = useExperienceControls()
const { hasSearched } = useHasSearched()
const x = use$x()

const { config: semanticQueriesConfig } = useState('semanticQueries')

const aiFallbackMode = getControlFromPath('fallback.aiFallbackMode')

const isLowResult = computed(
  () => x.totalResults > 0 && x.totalResults < semanticQueriesConfig.value.threshold,
)

const showFallbacks = computed(
  () => (x.noResults || isLowResult.value) && x.status.search === 'success',
)

const showAiSearchFallback = computed(() => aiFallbackMode.value && showFallbacks.value)
const showSearchFallbacks = computed(() => !aiFallbackMode.value && showFallbacks.value)
</script>
