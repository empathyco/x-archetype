<template>
  <div class="x-list x-list--vertical">
    <template v-if="hasSearched">
      <Redirection />

      <template v-if="!$x.redirections.length">
        <div
          v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
          class="x-padding--03 x-padding--bottom-07"
        >
          <template>
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
      </template>
    </template>
  </div>
</template>

<script lang="ts">
  import { LocationProvider } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import Recommendations from './results/recommendations.vue';
  import HasSearchedMixin from './has-searched.mixin';

  @Component({
    components: {
      LocationProvider,
      Recommendations,
      PartialResults: () => import('./search').then(m => m.PartialResults),
      Results: () => import('./search').then(m => m.Results),
      NoResultsMessage: () => import('./search').then(m => m.NoResultsMessage),
      Redirection: () => import('./search').then(m => m.Redirection),
      SpellcheckMessage: () => import('./search').then(m => m.SpellcheckMessage)
    }
  })
  export default class Main extends HasSearchedMixin {}
</script>
