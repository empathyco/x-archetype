<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />

    <template>
      <LocationProvider location="results">
        <Results />
      </LocationProvider>
      <LocationProvider :location="semanticsLocation">
        <CustomSemanticQueries />
      </LocationProvider>
      <LocationProvider v-if="!x.semanticQueries.length" location="results">
        <PartialResults />
      </LocationProvider>
      <LocationProvider v-if="showRecommendations" location="no_results">
        <CustomRecommendations />
      </LocationProvider>
    </template>
  </div>
</template>

<script lang="ts">
  import { FeatureLocation, LocationProvider, use$x } from '@empathyco/x-components';
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
      const $x = use$x();
      const semanticsLocation: ComputedRef<FeatureLocation> = computed(() =>
        $x.results.length > 0 ? 'low_results' : 'no_results'
      );
      const showRecommendations: ComputedRef<boolean> = computed(
        () => $x.noResults && !$x.partialResults.length && !$x.semanticQueries.length
      );
      return { hasSearched, semanticsLocation, showRecommendations, x: use$x() };
    }
  });
</script>
