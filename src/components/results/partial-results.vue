<template>
  <PartialResultsList v-if="hasQuery">
    <template #default="{ partialResult }">
      <span>{{ partialResult.query }}</span>
      <BaseGrid :columns="$x.device === 'mobile' ? 2 : 4" :items="partialResult.results">
        <template #result="{ item }">
          <Result :result="item" />
        </template>
      </BaseGrid>
      <PartialQueryButton :query="partialResult.query">
        <template #default="{ query }">Ver todos {{ query }}</template>
      </PartialQueryButton>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { BaseGrid } from '@empathyco/x-components';
  import { Component } from 'vue-property-decorator';
  import HasQueryMixin from '../has-query.mixin.vue';
  import ResultComponent from './result.vue';

  @Component({
    components: {
      BaseGrid,
      Result: ResultComponent,
      PartialResultsList: () => import('../search-has-query').then(m => m.PartialResultsList),
      PartialQueryButton: () => import('../search-has-query').then(m => m.PartialQueryButton)
    }
  })
  export default class PartialResults extends HasQueryMixin {}
</script>
