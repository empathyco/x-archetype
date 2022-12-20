<template>
  <PartialResultsList class="x-margin--bottom-06 x-list--gap-09">
    <template #default="{ partialResult }">
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-02 x-padding--left-05">
        <span class="x-title3">
          {{
            $t('partialResults.query', {
              query: partialResult.query
            })
          }}
        </span>
        <span class="x-text1">
          {{
            $t('partialResults.totalResults', {
              totalResults: partialResult.totalResults
            })
          }}
        </span>
        <PartialQueryButton
          :query="partialResult.query"
          class="x-button-lead x-button-ghost x-margin--left-auto"
        >
          {{ $t('partialResults.viewResults') }}
          <ChevronRightIcon />
        </PartialQueryButton>
      </div>
      <SlidingPanel
        :resetOnContentChange="false"
        buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
        class="x-sliding-panel--show-buttons-on-hover"
      >
        <div class="x-list x-list--gap-05 x-padding--left-05">
          <Result
            v-for="result in partialResult.results"
            :key="result.id"
            :result="result"
            class="x-partial-results__result"
          />
        </div>
      </SlidingPanel>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { ChevronRightIcon, SlidingPanel } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import {
    PartialQueryButton,
    PartialResultsList,
    ResultsList
  } from '@empathyco/x-components/search';
  import ResultComponent from '../../results/result.vue';

  @Component({
    components: {
      ChevronRightIcon,
      Result: ResultComponent,
      PartialResultsList,
      PartialQueryButton,
      ResultsList,
      SlidingPanel
    }
  })
  export default class MobilePartialResults extends Vue {}
</script>

<style lang="scss">
  .x-mobile {
    .x-partial-results {
      &__result {
        width: calc(38vw - var(--x-size-gap-list-05));
      }
    }
  }
</style>
