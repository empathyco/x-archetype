<template>
  <PartialResultsList class="x-mb-24 x-gap-40 desktop:x-gap-80">
    <template #default="{ partialResult }">
      <CustomSlidingPanel>
        <template #header>
          <PartialQueryButton
            :query="partialResult.query"
            class="x-button x-button-tight max-desktop:x-px-16"
          >
            {{ $t('partialResults.query', { query: partialResult.query }) }}
            {{ $t('partialResults.totalResults', { totalResults: partialResult.totalResults }) }}
            <ArrowRightIcon class="x-icon-lg" />
          </PartialQueryButton>
        </template>
        <ItemsList
          :items="partialResult.results"
          class="x-flex x-gap-16 x-pt-4 max-desktop:x-px-16"
        >
          <template #result="{ item: result }">
            <Result :result="result" class="x-w-[calc(38vw-16px)] desktop:x-w-[224px]" />
          </template>
        </ItemsList>
      </CustomSlidingPanel>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { ArrowRightIcon, ItemsList } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search';
  import ResultComponent from '../../results/result.vue';
  import CustomSlidingPanel from '../../custom-sliding-panel.vue';

  @Component({
    components: {
      ArrowRightIcon,
      CustomSlidingPanel,
      ItemsList,
      Result: ResultComponent,
      PartialResultsList,
      PartialQueryButton
    }
  })
  export default class PartialResults extends Vue {}
</script>
