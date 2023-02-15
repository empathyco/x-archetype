<template>
  <PartialResultsList class="x-margin--bottom-06 x-list--gap-08">
    <template #default="{ partialResult }">
      <CustomSlidingPanel
        :results="partialResult.results"
        :queryComponent="queryComponent"
        resultClass="x-w-[256px]"
        :query="partialResult.query"
        :maxItemsToRender="6"
        :totalResults="partialResult.totalResults"
      >
        <template #header>
          {{
            $t('partialResults.query', {
              query: partialResult.query
            })
          }}
          {{
            $t('partialResults.totalResults', {
              totalResults: partialResult.totalResults
            })
          }}
        </template>
      </CustomSlidingPanel>
      <!--      <div class="x-list x-list&#45;&#45;horizontal x-list&#45;&#45;align-baseline x-list&#45;&#45;gap-02">-->
      <!--        <span class="x-title3">-->
      <!--          {{-->
      <!--            $t('partialResults.query', {-->
      <!--              query: partialResult.query-->
      <!--            })-->
      <!--          }}-->
      <!--        </span>-->
      <!--        <span class="x-text1">-->
      <!--          {{-->
      <!--            $t('partialResults.totalResults', {-->
      <!--              totalResults: partialResult.totalResults-->
      <!--            })-->
      <!--          }}-->
      <!--        </span>-->
      <!--        <PartialQueryButton-->
      <!--          :query="partialResult.query"-->
      <!--          class="x-margin&#45;&#45;left-auto x-button-lead x-button-ghost"-->
      <!--        >-->
      <!--          {{ $t('partialResults.viewResults') }}-->
      <!--          <ChevronRightIcon />-->
      <!--        </PartialQueryButton>-->
      <!--      </div>-->
      <!--      <BaseGrid columns="4" :items="partialResult.results">-->
      <!--        <template #result="{ item }">-->
      <!--          <Result :result="item" />-->
      <!--        </template>-->
      <!--      </BaseGrid>-->
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { BaseGrid, ChevronRightIcon } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search';
  import ResultComponent from '../../results/result.vue';
  import CustomSlidingPanel from '../../custom-sliding-panel.vue';

  @Component({
    components: {
      CustomSlidingPanel,
      BaseGrid,
      ChevronRightIcon,
      Result: ResultComponent,
      PartialResultsList,
      PartialQueryButton
    }
  })
  export default class PartialResults extends Vue {
    public queryComponent = PartialQueryButton;
  }
</script>
