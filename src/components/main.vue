<template>
  <div v-if="hasSearched" class="xds:flex xds:flex-col">
    <Redirection />
    <LocationProvider location="results">
      <Results />
    </LocationProvider>
    <AiSearchFallback v-if="showAiSearchFallback" />
    <SearchFallback v-else-if="showSearchFallbacks" />
  </div>
</template>

<script setup lang="ts">
import { LocationProvider, use$x } from '@empathyco/x-components'
import { computed } from 'vue'
import { useExperienceControls } from '../composables/use-experience-controls.composable'
import { useHasSearched } from '../composables/use-has-searched.composable'
import { lowResultsThreshold } from '../x-components/constants'
import AiSearchFallback from './ai/ai-search-fallback.vue'
import Redirection from './search/redirection.vue'
import Results from './search/results/results.vue'
import SearchFallback from './search/search-fallback.vue'

const { getControlFromPath } = useExperienceControls()
const { hasSearched } = useHasSearched()
const x = use$x()

const aiSearchFallback = getControlFromPath('aiSearchFallback')

const isLowResult = computed(() => x.totalResults > 0 && x.totalResults < lowResultsThreshold)

const showFallbacks = computed(
  () => (x.noResults || isLowResult.value) && x.status.search === 'success',
)

const showAiSearchFallback = computed(() => aiSearchFallback.value && showFallbacks.value)
const showSearchFallbacks = computed(() => !aiSearchFallback.value && showFallbacks.value)
</script>
