<template>
  <div
    class="x-list x-background--neutral-95 x-list--gap-05"
    :class="
      $x.device === 'mobile'
        ? 'x-padding--05 x-padding--top-06 x-padding--bottom-06 x-margin--top-05' +
          ' x-margin--bottom-05'
        : 'x-padding--06 x-padding--bottom-07'
    "
  >
    <i18n class="x-text1 desktop:x-text1-lg" path="nextQueriesGroup.message" tag="p">
      <template #query>
        <span class="x-title3">
          {{ $x.query.search }}
        </span>
      </template>
    </i18n>
    <BaseSuggestions
      #default="{ suggestion }"
      :suggestions="nextQueries"
      class="x-list--horizontal x-list--wrap x-list--gap-03"
    >
      <NextQuery
        #default="{ suggestion: nextQuery }"
        :suggestion="suggestion"
        class="x-tag x-tag--pill x-list x-list--horizontal x-list--gap-03 x-padding--bottom-03 x-padding--top-03 x-border-color--neutral-70 x-background--neutral-100"
      >
        <CuratedCheckIcon v-if="nextQuery.isCurated" class="x-text-auxiliary-50" />
        <LightBulbOn v-else class="x-text-auxiliary-50" />
        <span class="x-ellipsis x-flex-auto x-text1 x-text-neutral-75">
          {{ nextQuery.query }}
        </span>
        <ArrowRightIcon class="x-icon-md x-text-auxiliary-50" />
      </NextQuery>
    </BaseSuggestions>
  </div>
</template>

<script lang="ts">
  import {
    ArrowRightIcon,
    LightBulbOn,
    CuratedCheckIcon,
    BaseSuggestions
  } from '@empathyco/x-components';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { NextQueriesList, NextQuery } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';

  @Component({
    components: {
      ArrowRightIcon,
      CuratedCheckIcon,
      LightBulbOn,
      NextQuery,
      BaseSuggestions,
      NextQueriesList
    }
  })
  export default class NextQueriesGroup extends Vue {
    @Prop({ required: true })
    protected nextQueries!: NextQueryModel[];
  }
</script>
<style lang="scss">
  .x-base-grid__next-queries-group {
    grid-column-start: 1;
    grid-column-end: -1;
  }
  .x-mobile {
    .x-base-grid__next-queries-group {
      margin-left: calc(-1 * var(--x-size-padding-grid));
      margin-right: calc(-1 * var(--x-size-padding-grid));
    }
  }
</style>
