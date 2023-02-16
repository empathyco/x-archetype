<template>
  <PartialResultsList class="x-margin--bottom-06 x-gap-40 desktop:x-gap-80">
    <template #default="{ partialResult }">
      <CustomSlidingPanel>
        <template #header>
          <component
            :is="
              partialResult.results.length < partialResult.totalResults
                ? slidingPanelHeaderComponent
                : 'div'
            "
            :query="partialResult.query"
            :class="
              partialResult.results.length < partialResult.totalResults
                ? 'x-button x-button-tight'
                : 'x-text1-md x-py-8 x-font-bold'
            "
            class="max-desktop:x-px-16"
          >
            {{ $t('partialResults.query', { query: partialResult.query }) }}
            {{ $t('partialResults.totalResults', { totalResults: partialResult.totalResults }) }}
            <ArrowRightIcon
              v-if="partialResult.results.length < partialResult.totalResults"
              class="x-icon-lg"
            />
          </component>
        </template>
        <ItemsList
          :items="partialResult.results"
          class="x-flex x-gap-16 x-pt-4 max-desktop:x-px-16"
        >
          <template #result="{ item: result }">
            <Result :result="result" class="x-w-[142px] desktop:x-w-[224px]" />
          </template>
        </ItemsList>
      </CustomSlidingPanel>
    </template>
  </PartialResultsList>
</template>

<script lang="ts">
  import { ArrowRightIcon, ChevronRightIcon, ItemsList } from '@empathyco/x-components';
  import { Component, Vue } from 'vue-property-decorator';
  import { PartialQueryButton, PartialResultsList } from '@empathyco/x-components/search';
  import ResultComponent from '../../results/result.vue';
  import CustomSlidingPanel from '../../custom-sliding-panel.vue';

  @Component({
    components: {
      ArrowRightIcon,
      CustomSlidingPanel,
      ChevronRightIcon,
      ItemsList,
      Result: ResultComponent,
      PartialResultsList
    }
  })
  export default class PartialResults extends Vue {
    public slidingPanelHeaderComponent = PartialQueryButton;
  }
</script>
