<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="x-flex x-flex-col x-gap-16 x-bg-neutral-10 x-p-24"
    :suggestion="nextQuery"
    maxItemsToRender="5"
  >
    <i18n class="x-text1 x-text1-lg" tag="span" path="nextQueryPreview.message">
      <template #query>
        <span class="x-title3">{{ $x.query.nextQueries }}</span>
      </template>
    </i18n>
    <CustomSlidingPanel>
      <template #header>
        <component
          :is="results.length < totalResults ? slidingPanelHeaderComponent : 'div'"
          :suggestion="nextQuery"
          :class="
            results.length < totalResults
              ? 'x-button x-button-tight'
              : 'x-text1-md x-py-8 x-font-bold'
          "
        >
          {{ $t('nextQueryPreview.query', { query: suggestion.query }) }}
          {{ $t('nextQueryPreview.totalResults', { totalResults }) }}
          <ArrowRightIcon v-if="results.length < totalResults" class="x-icon-lg" />
        </component>
      </template>
      <ItemsList :items="results" class="x-flex x-gap-16 x-pt-16">
        <template #result="{ item: result }">
          <Result :result="result" class="x-w-[262px]" />
        </template>
      </ItemsList>
    </CustomSlidingPanel>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BaseGrid, ArrowRightIcon, ItemsList } from '@empathyco/x-components';
  import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';
  import Result from '../results/result.vue';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';

  @Component({
    components: {
      CustomSlidingPanel,
      BaseGrid,
      NextQuery,
      NextQueryPreview,
      Result,
      ArrowRightIcon,
      ItemsList
    }
  })
  export default class DesktopNextQueryPreview extends Vue {
    public slidingPanelHeaderComponent = NextQuery;

    @Prop({ required: true })
    protected nextQuery!: NextQueryModel;
  }
</script>
