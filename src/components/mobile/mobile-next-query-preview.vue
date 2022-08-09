<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="
      x-list x-list--gap-05
      x-background--neutral-95
      x-padding--06 x-padding--bottom-06
      x-margin--top-10 x-margin--bottom-05
    "
    :suggestion="nextQuery"
  >
    <span class="x-title2 x-font-weight--bold">{{ $t('nextQueryPreview.title') }}</span>
    <div class="x-list x-list--horizontal x-list--align-center x-list--justify-space-between">
      <div class="x-list x-list--horizontal x-list--align-center x-list--gap-02">
        <span class="x-title3 x-font-weight--bold">
          {{
            $t('nextQueryPreview.query', {
              query: suggestion.query
            })
          }}
        </span>
        <span class="x-text x-font-size--04">
          {{
            $t('nextQueryPreview.totalResults', {
              totalResults: totalResults
            })
          }}
        </span>
      </div>
      <NextQuery
        :suggestion="nextQuery"
        class="x-button x-button--ghost x-border-width--00 x-padding--00 x-font-weight--bold"
      >
        {{ $t('nextQueryPreview.viewResults') }}
      </NextQuery>
    </div>
    <SlidingPanel
      class="x-background--neutral-95 x-margin--right-negative"
      :showButtons="false"
      :resetOnContentChange="false"
    >
      <div class="x-list x-list--gap-05">
        <Result
          v-for="result in results"
          :key="result.id"
          :result="result"
          class="x-next-query-preview__result"
        />
      </div>
    </SlidingPanel>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { SlidingPanel } from '@empathyco/x-components';
  import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';
  import Result from '../results/result.vue';

  @Component({
    components: {
      NextQuery,
      NextQueryPreview,
      Result,
      SlidingPanel
    }
  })
  export default class MobileNextQueryPreview extends Vue {
    @Prop({ required: true })
    protected nextQuery!: NextQueryModel;
  }
</script>

<style lang="scss">
  .x-mobile {
    .x-next-query-preview {
      margin-right: calc(-1 * var(--x-size-padding-grid));
      margin-left: calc(-1 * var(--x-size-padding-grid));

      &__result {
        max-width: calc(38vw - var(--x-size-gap-list-05));
      }
    }

    .x-margin--right-negative {
      margin-right: calc(-1 * var(--x-size-padding-grid));
    }
  }
</style>
