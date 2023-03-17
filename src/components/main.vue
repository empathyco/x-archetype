<template>
  <div v-if="hasSearched" class="x-list x-list--vertical">
    <Redirection />

    <template v-if="!$x.redirections.length">
      <LocationProvider location="results">
        <Results />
      </LocationProvider>

      <LocationProvider location="results">
        <PartialResults />
      </LocationProvider>
      <LocationProvider v-if="$x.noResults && !$x.partialResults.length" location="no_results">
        <CustomRecommendations />
      </LocationProvider>
    </template>
  </div>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import CustomRecommendations from './results/custom-recommendations.vue';
  import HasSearchedMixin from './has-searched.mixin';

  @Component({
    components: {
      LocationProvider,
      CustomRecommendations,
      PartialResults: () => import('./search').then(m => m.PartialResults),
      Results: () => import('./search').then(m => m.Results),
      Redirection: () => import('./search').then(m => m.Redirection)
    }
  })
  export default class Main extends HasSearchedMixin {}
</script>
