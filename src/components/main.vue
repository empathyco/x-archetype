<template>
  <div class="xds:flex xds:w-full xds:flex-col">
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
import AiSearchFallback from './ai/ai-search-fallback.vue'
import Redirection from './search/redirection.vue'
import Results from './search/results/results.vue'
import SearchFallback from './search/search-fallback.vue'

const x = use$x()

const { getControl } = useExperienceControls()
const aiSearchFallback = getControl<boolean>('aiSearchFallback')

const showFallbacks = computed(() => (x.noResults || x.lowResults) && x.status.search === 'success')

const showAiSearchFallback = computed(() => aiSearchFallback.value && showFallbacks.value)
const showSearchFallbacks = computed(() => !aiSearchFallback.value && showFallbacks.value)
</script>
