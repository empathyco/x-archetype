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
    <div class="x-list x-list--gap-03">
      <p v-html="$t('nextQueriesGroup.message', { query: $x.query.search })" class="x-text" />
    </div>
    <NextQueries
      #suggestion="{ suggestion }"
      :suggestions="nextQueries"
      class="x-list--horizontal x-list--wrap x-list--gap-03"
      :max-items-to-render="4"
    >
      <NextQuery
        #default="{ suggestion: nextQuery }"
        :suggestion="suggestion"
        class="
          x-tag x-tag--pill
          x-list x-list--gap-03
          x-padding--bottom-03 x-padding--top-03
          x-border-color--neutral-70
          x-background--neutral-100
        "
      >
        <CuratedCheckIcon v-if="nextQuery.isCurated" class="x-font-color--accent" />
        <LightBulbOn v-else class="x-font-color--accent" />
        <span class="x-text x-ellipsis x-flex-auto x-font-color--neutral-35">
          {{ nextQuery.query }}
        </span>
        <ArrowRightIcon class="x-icon--m x-font-color--accent" />
      </NextQuery>
    </NextQueries>
  </div>
</template>

<script lang="ts">
  import { ArrowRightIcon, LightBulbOn, CuratedCheckIcon } from '@empathyco/x-components';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { NextQueries, NextQueriesList, NextQuery } from '@empathyco/x-components/next-queries';
  import { NextQuery as NextQueryModel } from '@empathyco/x-types';

  @Component({
    components: {
      ArrowRightIcon,
      CuratedCheckIcon,
      LightBulbOn,
      NextQuery,
      NextQueries,
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
    margin-left: calc(-1 * var(--x-size-base-04));
    margin-right: calc(-1 * var(--x-size-base-04));
    grid-column-start: 1;
    grid-column-end: -1;
  }
</style>
