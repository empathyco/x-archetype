<template>
  <div v-if="hasSearched" class="x-flex x-flex-col">
    <Redirection />

    <template>
      <LocationProvider location="results">
        <Results />
      </LocationProvider>

      <LocationProvider location="results">
        <PartialResults />
      </LocationProvider>
      <LocationProvider v-if="$x.noResults && !$x.partialResults.length" location="no_results">
        <CustomRecommendations />
      </LocationProvider>

      <CustomSemanticQueries />
    </template>
  </div>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import { defineComponent } from 'vue';
  import { useHasSearched } from '../composables/use-has-searched.composable';
  import CustomRecommendations from './results/custom-recommendations.vue';
  import CustomSemanticQueries from './search/custom-semantic-queries.vue';

  export default defineComponent({
    components: {
      CustomSemanticQueries,
      LocationProvider,
      CustomRecommendations,
      PartialResults: () => import('./search').then(m => m.PartialResults),
      Results: () => import('./search').then(m => m.Results),
      Redirection: () => import('./search').then(m => m.Redirection)
    },
    setup() {
      const { hasSearched } = useHasSearched();
      return { hasSearched };
    }
  });
</script>
