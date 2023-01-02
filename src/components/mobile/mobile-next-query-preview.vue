<template>
  <NextQueryPreview
    #default="{ results, totalResults, suggestion }"
    class="
      x-list x-list--gap-05
      x-background--neutral-95
      x-padding--top-06 x-padding--bottom-06
      x-margin--top-10 x-margin--bottom-05
    "
    :suggestion="nextQuery"
  >
    <i18n
      class="x-text1 x-text1-lg x-next-query-preview__title"
      tag="span"
      path="nextQueryPreview.message"
    >
      <template #query>
        <span class="x-title3">{{ $x.query.nextQueries }}</span>
      </template>
    </i18n>
    <div class="x-next-query-preview__header x-list x-list--horizontal x-list--align-center">
      <div class="x-list x-list--horizontal x-list--align-baseline x-list--gap-02">
        <span class="x-title3">
          {{
            $t('nextQueryPreview.query', {
              query: suggestion.query
            })
          }}
        </span>
        <span class="x-text1">
          {{
            $t('nextQueryPreview.totalResults', {
              totalResults: totalResults
            })
          }}
        </span>
      </div>
      <NextQuery
        :suggestion="nextQuery"
        class="x-margin--left-auto x-list x-list--gap-04 x-font-bold"
      >
        {{ $t('nextQueryPreview.viewResults') }}
        <ChevronRightIcon />
      </NextQuery>
    </div>
    <SlidingPanel
      class="x-background--neutral-95"
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
  import { SlidingPanel, ChevronRightIcon } from '@empathyco/x-components';
  import { NextQuery, NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';
  import Result from '../results/result.vue';

  @Component({
    components: {
      NextQuery,
      NextQueryPreview,
      Result,
      ChevronRightIcon,
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
      margin-inline: calc(-1 * var(--x-size-padding-grid));

      &__title {
        padding-inline: var(--x-size-padding-grid);
      }

      &__header {
        padding-inline: var(--x-size-padding-grid);
      }

      &__result {
        width: calc(38vw - var(--x-size-gap-list-05));
      }

      .x-sliding-panel__scroll {
        padding-left: var(--x-size-padding-grid);
      }
    }
  }
</style>
