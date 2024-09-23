<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />
    <LocationProvider location="results">
      <Results />
    </LocationProvider>
    <LocationProvider :location="semanticsLocation">
      <CustomSemanticQueries />
    </LocationProvider>
    <LocationProvider v-if="!semanticQueries.length" location="results">
      <PartialResults />
    </LocationProvider>
    <LocationProvider v-if="showRecommendations" location="no_results">
      <CustomRecommendations />
    </LocationProvider>
  </div>
</template>

<script lang="ts">
  import { FeatureLocation, LocationProvider, useState } from '@empathyco/x-components';
  import { ComputedRef, computed, defineAsyncComponent, defineComponent } from 'vue';
  import { useHasSearched } from '../composables/use-has-searched.composable';
  import CustomRecommendations from './results/custom-recommendations.vue';
  import CustomSemanticQueries from './search/custom-semantic-queries.vue';

  export default defineComponent({
    components: {
      CustomSemanticQueries,
      LocationProvider,
      CustomRecommendations,
      PartialResults: defineAsyncComponent(() => import('./search').then(m => m.PartialResults)),
      Results: defineAsyncComponent(() => import('./search').then(m => m.Results)),
      Redirection: defineAsyncComponent(() => import('./search').then(m => m.Redirection))
    },
    setup() {
      const { hasSearched } = useHasSearched();
      const { semanticQueries } = useState('semanticQueries', ['semanticQueries']);
      const {
        isNoResults: noResults,
        partialResults,
        results
      } = useState('search', ['isNoResults', 'partialResults', 'results']);
      const semanticsLocation: ComputedRef<FeatureLocation> = computed(() =>
        results.value.length > 0 ? 'low_results' : 'no_results'
      );
      const showRecommendations: ComputedRef<boolean> = computed(
        () => noResults.value && !partialResults.value.length && !semanticQueries.value.length
      );
      return {
        hasSearched,
        semanticsLocation,
        showRecommendations,
        semanticQueries
      };
    }
  });
</script>
