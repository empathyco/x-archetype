<template>
  <PartialResultsList class="x-margin--bottom-06 x-list--gap-12">
    <template #default="{ partialResult }">
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-02">
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
      <BaseGrid columns="4" :items="partialResult.results">
        <template #result="{ item }">
          <Result :result="item" />
        </template>
      </BaseGrid>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { BaseGrid, ChevronRightIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search';
  import ResultComponent from '../../results/result.vue';

  @Component({
    components: {
      BaseGrid,
      ChevronRightIcon,
      Result: ResultComponent,
      PartialResultsList,
      PartialQueryButton
    }
  })
  export default class PartialResults extends Vue {}
</script>
