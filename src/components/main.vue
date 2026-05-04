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
import type { Dictionary } from '@empathyco/x-utils'
import { LocationProvider, use$x, useState } from '@empathyco/x-components'
import { computed, defineAsyncComponent } from 'vue'
import { useHasSearched } from '../composables/use-has-searched.composable'
import { lowResultsThreshold } from '../x-components/constants'
import { xControlsState } from '../x-components/xcontrols'

const Redirection = defineAsyncComponent(() => import('./search').then(m => m.Redirection))
const Results = defineAsyncComponent(() => import('./search').then(m => m.Results))
const AiSearchFallback = defineAsyncComponent(() =>
  import('./ai/ai-search-fallback.vue').then(m => m.default),
)
const SearchFallback = defineAsyncComponent(() =>
  import('./search/search-fallback.vue').then(m => m.default),
)

const { hasSearched } = useHasSearched()
const x = use$x()

const controls = useState('experienceControls').controls.value.controls as Dictionary<unknown>
const aiSearchFallback = (controls?.aiSearchFallback as boolean) ?? xControlsState.aiSearchFallback

const isLowResult = computed(() => x.totalResults > 0 && x.totalResults < lowResultsThreshold)

const showFallbacks = computed(
  () => (x.noResults || isLowResult.value) && x.status.search === 'success',
)

const showAiSearchFallback = computed(() => aiSearchFallback && showFallbacks.value)
const showSearchFallbacks = computed(() => !aiSearchFallback && showFallbacks.value)
</script>
