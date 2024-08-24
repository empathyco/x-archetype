<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />

    <LocationProvider location="results">
      <Results />
    </LocationProvider>

    <LocationProvider location="results">
      <PartialResults />
    </LocationProvider>
    <LocationProvider v-if="x.noResults && !x.partialResults.length" location="no_results">
      <CustomRecommendations />
    </LocationProvider>

    <CustomSemanticQueries />
  </div>
</template>

<script lang="ts">
  import { LocationProvider, use$x } from '@empathyco/x-components';
  import { defineAsyncComponent, defineComponent } from 'vue';
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
      return { hasSearched, x: use$x() };
    }
  });
</script>
