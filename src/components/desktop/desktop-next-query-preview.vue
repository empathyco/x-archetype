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
    <div class="x-list x-list--horizontal x-list--justify-space-between x-list--gap-05">
      <Result
        v-for="result in results.slice(0, maxItemsToRender)"
        :key="result.id"
        :result="result"
        :showAddToCart="false"
        class="x-next-query-preview__result"
      />
    </div>
    <BaseEventButton
      v-if="$x.device === 'desktop'"
      :events="clickEvents"
      class="
        x-tag x-tag--pill
        x-font-weight--bold
        x-margin--left-auto x-margin--right-auto
        x-padding--top-04 x-padding--bottom-04 x-padding--right-05 x-padding--left-05
        x-font-color--lead
        x-border-color--lead
        x-background--neutral-100
      "
    >
      {{ $t('nextQueryPreview.viewResults', { totalResults }) }}
    </BaseEventButton>
  </NextQueryPreview>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { BaseEventButton, XEventsTypes } from '@empathyco/x-components';
  import { NextQueryPreview } from '@empathyco/x-components/next-queries';
  import { NextQuery } from '@empathyco/x-types';
  import Result from '../results/result.vue';

  @Component({
    components: {
      BaseEventButton,
      NextQueryPreview,
      Result
    }
  })
  export default class DesktopNextQueryPreview extends Vue {
    @Prop({ default: 4 })
    protected maxItemsToRender!: number;

    @Prop({ required: true })
    protected nextQuery!: NextQuery;

    protected clickEvents: Partial<XEventsTypes> = {
      UserAcceptedAQuery: this.nextQuery.query
    };
  }
</script>

<style lang="scss">
  .x-base-grid__next-queries-group {
    grid-column-start: 1;
    grid-column-end: -1;
  }

  .x-desktop {
    .x-next-query-preview__result {
      max-width: calc(25% - var(--x-size-gap-list-05));
    }
  }
</style>
