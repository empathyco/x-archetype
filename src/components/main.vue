<template>
  <div class="x-list x-list--vertical">
    <Redirection v-if="hasQuery" />

    <template v-if="!$x.redirections.length">
      <div
        v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
        class="x-padding--03 x-padding--bottom-07"
      >
        <template v-if="hasQuery">
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
  import Redirection from './search-has-query/redirection.vue';
  import PartialResults from './results/partial-results.vue';
  import Recommendations from './results/recommendations.vue';
  import Results from './results/results.vue';
  import HasQueryMixin from './has-query.mixin.vue';

  @Component({
    components: {
      LocationProvider,
      PartialResults,
      Recommendations,
      Redirection,
      Results,
      NoResultsMessage: () => import('./search-has-query').then(m => m.NoResultsMessage),
      SpellcheckMessage: () => import('./search-has-query').then(m => m.SpellcheckMessage)
    }
  })
  export default class Main extends HasQueryMixin {}
</script>
