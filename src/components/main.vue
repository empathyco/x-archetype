<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />
    <LocationProvider location="results">
      <Results />
    </LocationProvider>
    <LocationProvider v-if="showRelatedPrompts" :location="semanticsLocation">
      <CustomRelatedPrompts
        :related-prompt-list="relatedPrompts"
        :class="x.noResults ? 'desktop:x-mt-24' : 'x-mt-48 desktop:x-mt-32'"
      />
    </LocationProvider>
    <LocationProvider v-if="showSemantics" :location="semanticsLocation">
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

<script lang="ts">
import type { FeatureLocation } from '@empathyco/x-components'
import type { SemanticQueriesConfig } from '@empathyco/x-components/types'
import type { ComputedRef } from 'vue'
import { LocationProvider, use$x, useState } from '@empathyco/x-components'
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import { useHasSearched } from '../composables/use-has-searched.composable'
import CustomRelatedPrompts from './related-prompts/custom-related-prompts.vue'
import CustomRecommendations from './results/custom-recommendations.vue'
import CustomSemanticQueries from './search/custom-semantic-queries.vue'

export default defineComponent({
  name: 'MainComponent',
  components: {
    CustomRecommendations,
    CustomRelatedPrompts,
    CustomSemanticQueries,
    LocationProvider,
    PartialResults: defineAsyncComponent(() => import('./search').then(m => m.PartialResults)),
    Redirection: defineAsyncComponent(() => import('./search').then(m => m.Redirection)),
    Results: defineAsyncComponent(() => import('./search').then(m => m.Results)),
  },
  setup() {
    const { hasSearched } = useHasSearched()
    const x = use$x()

    const semanticQueriesConfig = useState('semanticQueries', ['config'])
      .config as ComputedRef<SemanticQueriesConfig>

    const { relatedPrompts } = useState('relatedPrompts', ['relatedPrompts'])

    const { config } = useState('search', ['config'])

    const semanticsLocation = computed<FeatureLocation>(() =>
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
      () =>
        (x.noResults || x.totalResults < config.value?.pageSize) && relatedPrompts.value?.length,
    )

    return {
      hasSearched,
      relatedPrompts,
      semanticsLocation,
      showPartials,
      showRecommendations,
      showRelatedPrompts,
      showSemantics,
      x,
    }
  },
})
</script>
