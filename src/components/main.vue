<template>
  <div v-if="hasSearched" class="x-list x-list--vertical">
    <Redirection />

    <template v-if="!$x.redirections.length">
      <LocationProvider location="results">
        <Results />
      </LocationProvider>

      <LocationProvider location="results">
        <PartialResults v-if="$x.device === 'desktop'" />
        <MobilePartialResults v-else />
      </LocationProvider>
      <LocationProvider v-if="$x.noResults && !$x.partialResults.length" location="no_results">
        <Recommendations />
      </LocationProvider>
    </template>
  </div>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import Recommendations from './results/recommendations.vue';
  import HasSearchedMixin from './has-searched.mixin';
  import CustomQueryPreview from './pre-search/custom-query-preview.vue';

  @Component({
    components: {
      LocationProvider,
      Recommendations,
      CustomQueryPreview,
      PartialResults: () => import('./search').then(m => m.PartialResults),
      Results: () => import('./search').then(m => m.Results),
      MobilePartialResults: () => import('./search').then(m => m.MobilePartialResults),
      Redirection: () => import('./search').then(m => m.Redirection)
    }
  })
  export default class Main extends HasSearchedMixin {}
</script>
