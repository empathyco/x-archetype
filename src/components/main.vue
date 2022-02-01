<template>
  <div class="x-list x-list--vertical">
    <Redirection v-if="hasSearched" />

    <template v-if="!$x.redirections.length">
      <div
        v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
        class="x-padding--03 x-padding--bottom-07"
      >
        <template v-if="hasSearched">
          <SpellcheckMessage />
          <NoResultsMessage />
        </template>
      </div>

      <LocationProvider location="results">
        <Results />
      </LocationProvider>

      <LocationProvider location="results">
        <PartialResults />
      </LocationProvider>

      <LocationProvider v-if="$x.noResults" location="no_results">
        <Recommendations />
      </LocationProvider>

      <LocationProvider v-if="!$x.query.search" location="no_query">
        <Recommendations />
      </LocationProvider>
    </template>
  </div>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import PartialResults from './results/partial-results.vue';
  import Recommendations from './results/recommendations.vue';
  import Results from './results/results.vue';
  import HasSearchedMixin from './has-searched.mixin.vue';

  @Component({
    components: {
      LocationProvider,
      PartialResults,
      Recommendations,
      Results,
      NoResultsMessage: () => import('./search').then(m => m.NoResultsMessage),
      Redirection: () => import('./search').then(m => m.Redirection),
      SpellcheckMessage: () => import('./search').then(m => m.SpellcheckMessage)
    }
  })
  export default class Main extends HasSearchedMixin {}
</script>
