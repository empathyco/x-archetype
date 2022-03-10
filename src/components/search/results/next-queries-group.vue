<template>
  <div class="x-list x-padding--06 x-background--neutral-95 x-list--gap-06">
    <div class="x-list x-list--gap-03">
      <h1 class="x-title3 x-text--bold">{{ $t('nextQueriesGroup.title') }}</h1>
      <p v-html="$t('nextQueriesGroup.message', { query: $x.query.search })" class="x-text" />
    </div>
    <NextQueries
      #suggestion="{ suggestion }"
      :suggestions="nextQueries"
      class="x-list--gap-06"
      :max-items-to-render="4"
    >
      <NextQuery
        #default="{ suggestion: nextQuery }"
        :suggestion="suggestion"
        class="
          x-tag x-tag--pill
          x-list x-list--gap-03
          x-padding--bottom-03 x-padding--top-03
          x-border-color--neutral-10
          x-background--neutral-100
        "
      >
        <CuratedCheckIcon v-if="nextQuery.isCurated" />
        <LightBulbOn v-else />
        <span class="x-text x-ellipsis x-flex-auto">{{ nextQuery.query }}</span>
        <ArrowRightIcon class="x-icon--m" />
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
