<template>
  <div class="x-list x-list--vertical">
    <Redirection />

    <template v-if="!$x.redirections.length">
      <div class="x-list x-list--padding-03">
        <div
          v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
          class="x-list x-list--padding-06 x-list--padding-bottom"
        >
          <SpellcheckMessage />
          <NoResultsMessage />
        </div>
      </div>

      <Results />

      <PartialResults />

      <LocationProvider v-if="!$x.query.search" location="no_results">
        <Recommendations />
      </LocationProvider>

      <LocationProvider v-if="!$x.query.search" location="no_results">
        <Recommendations />
      </LocationProvider>
    </template>
  </div>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Redirection from './results/redirection.vue';
  import NoResultsMessage from './no-results-message.vue';
  import PartialResults from './results/partial-results.vue';
  import Recommendations from './results/recommendations.vue';
  import Results from './results/results.vue';
  import SpellcheckMessage from './spellcheck-message.vue';

  @Component({
    components: {
      LocationProvider,
      NoResultsMessage,
      PartialResults,
      Recommendations,
      Redirection,
      Results,
      SpellcheckMessage
    }
  })
  export default class Main extends Vue {}
</script>
