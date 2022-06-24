<template>
  <PartialResultsList>
    <template #default="{ partialResult }">
      <span>{{ partialResult.query }}</span>
      <BaseGrid :columns="$x.device === 'mobile' ? 2 : 4" :items="partialResult.results">
        <template #result="{ item }">
          <Result :result="item" />
        </template>
      </BaseGrid>
      <PartialQueryButton :query="partialResult.query">
        {{ $t('partialResults.message') }}
      </PartialQueryButton>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { BaseGrid } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search';
  import ResultComponent from '../../results/result.vue';

  @Component({
    components: {
      BaseGrid,
      Result: ResultComponent,
      PartialResultsList,
      PartialQueryButton
    }
  })
  export default class PartialResults extends Vue {}
</script>
