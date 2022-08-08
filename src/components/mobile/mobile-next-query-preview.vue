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
      <BaseEventButton
        :events="clickEvents"
        class="x-button x-button--ghost x-border-width--00 x-padding--right-00"
      >
        {{ $t('nextQueryPreview.viewResults') }}
      </BaseEventButton>
    </div>
    <SlidingPanel
      class="x-sliding-panel--no-gradient x-background--neutral-95 x-margin--right-negative"
      :showButtons="false"
      :resetOnContentChange="false"
    >
      <div class="x-list x-list--gap-05">
        <Result
          v-for="result in results"
          :key="result.id"
          :result="result"
          :showAddToCart="false"
          class="x-next-query-preview__result"
        />
      </div>
    </SlidingPanel>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BaseEventButton, SlidingPanel, XEventsTypes } from '@empathyco/x-components';
  import { NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery } from '@empathyco/x-types';
  import Result from '../results/result.vue';

  @Component({
    components: {
      BaseEventButton,
      NextQueryPreview,
      Result,
      SlidingPanel
    }
  })
  export default class CustomNextQueryPreview extends Vue {
    @Prop({ required: true })
    protected nextQuery!: NextQuery;

    protected clickEvents: Partial<XEventsTypes> = {
      UserAcceptedAQuery: this.nextQuery.query
    };
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
