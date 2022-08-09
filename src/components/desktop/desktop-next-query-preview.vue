<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="x-list x-background--neutral-95 x-list--gap-06 x-padding--06"
    :suggestion="nextQuery"
  >
    <span class="x-title2 x-font-weight--bold">{{ $t('nextQueryPreview.title') }}</span>
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
      :animation="gridAnimation"
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
        x-margin--left-auto x-margin--right-auto
        x-padding--top-04 x-padding--bottom-04 x-padding--right-05 x-padding--left-05
        x-font-color--lead
        x-border-color--lead
      "
    >
      {{ $t('nextQueryPreview.viewResults', { totalResults }) }}
    </NextQuery>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BaseGrid, StaggeredFadeAndSlide } from '@empathyco/x-components';
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

    protected gridAnimation = StaggeredFadeAndSlide;
  }
</script>

<style lang="scss">
  .x-base-grid__next-queries-group {
    grid-column-start: 1;
    grid-column-end: -1;
  }
</style>
