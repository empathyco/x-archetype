<template>
  <BaseKeyboardNavigation class="x-list__item--expand x-row x-row--gap-06 x-row--align-start">
    <QuerySuggestions
      v-if="$x.query.searchBox"
      #suggestion-content="{ queryHTML }"
      class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
      :animation="suggestionsAnimation"
      :max-items-to-render="5"
    >
      <SearchIcon />
      <span v-html="queryHTML" />
    </QuerySuggestions>

    <div
      v-if="$x.nextQueries.length > 0"
      class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
    >
      <h1 class="x-title3 x-list x-list--horizontal x-list--gap-03 x-list--align-center">
        <MinusIcon />
        <span>{{ $t('nextQueries.title') }}</span>
      </h1>
      <NextQueries
        class="x-list x-list--gap-03"
        :animation="suggestionsAnimation"
        :max-items-to-render="5"
      >
        <template #suggestion-content="{ suggestion }">
          <Nq4Icon />
          <span>{{ suggestion.query }}</span>
        </template>
      </NextQueries>
    </div>

    <div
      v-if="$x.historyQueries.length > 0 && !$x.query.searchBox"
      class="x-row__item x-row__item--span-4 x-list x-list--gap-03 x-list--align-start"
    >
      <h1 class="x-title3 x-list x-list--horizontal x-list--gap-03 x-list--align-center">
        <MinusIcon />
        <span>{{ $t('historyQueries.title') }}</span>
      </h1>

      <HistoryQueries
        class="x-list x-list--gap-03"
        :animation="suggestionsAnimation"
        :max-items-to-render="4"
      >
        <template #suggestion-content="{ queryHTML }">
          <HistoryIcon />
          <span v-html="queryHTML" />
        </template>

        <template #suggestion-remove-content="{ suggestion }">
          <span :aria-label="$t('historyQueries.removeLabel', { suggestion: suggestion.query })">
            <CrossTinyIcon />
          </span>
        </template>
      </HistoryQueries>

      <ClearHistoryQueries class="x-button--ghost">
        <CrossTinyIcon />
        <span>{{ $t('historyQueries.clear') }}</span>
      </ClearHistoryQueries>
    </div>

    <div
      v-if="$x.popularSearches.length > 0 && !$x.query.searchBox"
      class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
    >
      <h1 class="x-title3 x-list x-list--horizontal x-list--gap-03 x-list--align-center">
        <MinusIcon />
        <span>{{ $t('popularSearches.title') }}</span>
      </h1>
      <PopularSearches
        class="x-list x-list--gap-03"
        :animation="suggestionsAnimation"
        :max-items-to-render="5"
      >
        <template #suggestion-content="{ suggestion }">
          <TrendingTinyIcon />
          <span>{{ suggestion.query }}</span>
        </template>
      </PopularSearches>
    </div>
  </BaseKeyboardNavigation>
</template>

<script lang="ts">
  import { Empathize } from '@empathy/x-components/empathize';
  import {
    BaseKeyboardNavigation,
    CrossTinyIcon,
    FadeAndSlide,
    HistoryIcon,
    MinusIcon,
    Nq4Icon,
    SearchIcon,
    TrendingTinyIcon
  } from '@empathy/x-components';
  import { ClearHistoryQueries, HistoryQueries } from '@empathy/x-components/history-queries';
  import { NextQueries } from '@empathy/x-components/next-queries';
  import { PopularSearches } from '@empathy/x-components/popular-searches';
  import { QuerySuggestions } from '@empathy/x-components/query-suggestions';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      BaseKeyboardNavigation,
      CrossTinyIcon,
      ClearHistoryQueries,
      Empathize,
      HistoryIcon,
      HistoryQueries,
      MinusIcon,
      NextQueries,
      Nq4Icon,
      PopularSearches,
      QuerySuggestions,
      SearchIcon,
      TrendingTinyIcon
    }
  })
  export default class EmpathizeComponent extends Vue {
    public suggestionsAnimation = FadeAndSlide;
  }
</script>
