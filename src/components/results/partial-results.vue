<template>
  <PartialResultsList v-if="hasSearched">
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
  import HasSearchedMixin from '../has-searched.mixin.vue';
  import ResultComponent from './result.vue';

  @Component({
    components: {
      BaseGrid,
      Result: ResultComponent,
      PartialResultsList: () => import('../search').then(m => m.PartialResultsList),
      PartialQueryButton: () => import('../search').then(m => m.PartialQueryButton)
    }
  })
  export default class PartialResults extends HasSearchedMixin {}
</script>
