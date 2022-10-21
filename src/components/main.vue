<template>
  <div class="x-list x-list--vertical">
    <LocationProvider location="no_query">
      <CustomQueryPreview
        :class="$x.device === 'mobile' ? 'x-margin--top-05' : 'x-margin--top-10'"
      />
    </LocationProvider>
    <template v-if="hasSearched">
      <Redirection />

      <template v-if="!$x.redirections.length">
        <div
          v-if="$x.totalResults === 0 || $x.spellcheckedQuery"
          class="x-padding--top-03 x-padding--bottom-07"
          :class="{ 'x-margin--left-05 x-margin--right-05': $x.device === 'mobile' }"
        >
          <template>
            <SpellcheckMessage data-test="spellcheck-message" />
            <NoResultsMessage data-test="no-results-message" />
          </template>
        </div>

        <LocationProvider location="results">
          <Results />
        </LocationProvider>

        <LocationProvider location="results">
          <PartialResults v-if="$x.device === 'desktop'" />
          <MobilePartialResults v-else />
        </LocationProvider>
        <LocationProvider v-if="$x.noResults && !$x.partialResults" location="no_results">
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
  import CustomQueryPreview from './pre-search/custom-query-preview.vue';

  @Component({
    components: {
      LocationProvider,
      Recommendations,
      CustomQueryPreview,
      PartialResults: () => import('./search').then(m => m.PartialResults),
      Results: () => import('./search').then(m => m.Results),
      MobilePartialResults: () => import('./search').then(m => m.MobilePartialResults),
      NoResultsMessage: () => import('./search').then(m => m.NoResultsMessage),
      Redirection: () => import('./search').then(m => m.Redirection),
      SpellcheckMessage: () => import('./search').then(m => m.SpellcheckMessage)
    }
  })
  export default class Main extends HasSearchedMixin {}
</script>
