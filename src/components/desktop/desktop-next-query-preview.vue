<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="x-list x-background--neutral-95 x-list--gap-05 x-padding--06"
    :suggestion="nextQuery"
  >
    <i18n class="x-title3" tag="span" path="nextQueryPreview.message">
      <template #query>
        <span class="x-text x-text--bold x-title3">{{ $x.query.nextQueries }}</span>
      </template>
    </i18n>
    <div class="x-list x-list--horizontal x-list--align-center x-list--gap-03">
      <span class="x-title3 x-font-weight--bold">
        {{
          $t('nextQueryPreview.query', {
            query: suggestion.query
          })
        }}
      </span>
      <span class="x-text">
        {{
          $t('nextQueryPreview.totalResults', {
            totalResults: totalResults
          })
        }}
      </span>
    </div>
    <BaseGrid
      #default="{ item }"
      :columns="maxItemsToRender"
      :items="results.slice(0, maxItemsToRender)"
      class="x-padding--00"
    >
      <Result :result="item" />
    </BaseGrid>
    <NextQuery
      :suggestion="nextQuery"
      class="
        x-tag x-tag--pill
        x-font-weight--bold
        x-margin--left-auto x-margin--right-auto x-margin--top-03
        x-padding--top-04 x-padding--bottom-04 x-padding--right-05 x-padding--left-05
        x-font-color--lead
        x-border-color--lead
      "
    >
      {{ $t('nextQueryPreview.viewResults') }}
    </NextQuery>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BaseGrid } from '@empathyco/x-components';
  import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';
  import Result from '../results/result.vue';

  @Component({
    components: {
      BaseGrid,
      NextQuery,
      NextQueryPreview,
      Result
    }
  })
  export default class DesktopNextQueryPreview extends Vue {
    // TODO: Remove this and configure NextQueryPreview after doing EX-6819.
    @Prop({ default: 4 })
    protected maxItemsToRender!: number;

    @Prop({ required: true })
    protected nextQuery!: NextQueryModel;
  }
</script>
