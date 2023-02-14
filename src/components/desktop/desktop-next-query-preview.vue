<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="x-list x-background--neutral-95 x-list--gap-05 x-padding--06"
    :suggestion="nextQuery"
  >
    <i18n class="x-text1 x-text1-lg" tag="span" path="nextQueryPreview.message">
      <template #query>
        <span class="x-title3">{{ $x.query.nextQueries }}</span>
      </template>
    </i18n>
    <NextQuery :suggestion="nextQuery" class="x-suggestion-lead-50 x-font-bold">
      <span>
        {{
          $t('nextQueryPreview.query', {
            query: suggestion.query
          })
        }}
        {{
          $t('nextQueryPreview.totalResults', {
            totalResults: totalResults
          })
        }}
      </span>
      <ArrowRightIcon class="x-icon-lg" />
    </NextQuery>
    <BaseGrid
      #default="{ item }"
      :columns="maxItemsToRender"
      :items="results.slice(0, maxItemsToRender)"
      class="x-padding--00"
    >
      <Result :result="item" />
    </BaseGrid>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BaseGrid, ArrowRightIcon } from '@empathyco/x-components';
  import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';
  import Result from '../results/result.vue';

  @Component({
    components: {
      BaseGrid,
      NextQuery,
      NextQueryPreview,
      Result,
      ArrowRightIcon
    }
  })
  export default class DesktopNextQueryPreview extends Vue {
    // TODO: Remove this and configure NextQueryPreview after doing EX-6819.
    @Prop({ default: 5 })
    protected maxItemsToRender!: number;

    @Prop({ required: true })
    protected nextQuery!: NextQueryModel;
  }
</script>
