<template>
  <Empathize
    :animation="empathizeAnimation"
    :class="
      $x.device === 'mobile' ? 'x-list--padding-03' : 'x-list--padding-05 x-list--padding-bottom'
    "
    class="x-list"
  >
    <BaseKeyboardNavigation class="x-list x-list--vertical x-list--gap-06 x-list__item--expand">
      <IdentifierResults
        #default="{ identifierResult }"
        :animation="suggestionsAnimation"
        class="x-row__item x-row__item--span-12 x-list x-list--gap-03"
      >
        <BaseResultLink #default="{ result }" :result="identifierResult" class="x-suggestion">
          <BarCodeIcon />
          <IdentifierResult :result="result" class="x-text x-text--bold" />
          <span class="x-text x-text--bold x-ellipsis">
            {{ result.name }}
          </span>
        </BaseResultLink>
      </IdentifierResults>

      <div
        v-if="$x.historyQueries.length > 0"
        class="x-row__item x-row__item--span-4 x-list x-list--gap-03 x-list--align-start"
      >
        <h1
          v-if="!$x.query.searchBox"
          class="
            x-title3
            x-text--bold x-text--secondary
            x-list x-list--horizontal x-list--gap-03 x-list--align-center
          "
        >
          <MinusIcon />
          <span>{{ $t('historyQueries.title') }}</span>
        </h1>

        <HistoryQueries
          :animation="suggestionsAnimation"
          :max-items-to-render="$x.query.searchBox ? 2 : 4"
          class="x-list x-list--gap-03"
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

        <ClearHistoryQueries
          v-if="!$x.query.searchBox"
          class="x-button--ghost x-button--ghost-start"
        >
          <CrossTinyIcon />
          <span>{{ $t('historyQueries.clear') }}</span>
        </ClearHistoryQueries>
      </div>

      <QuerySuggestions
        v-if="$x.query.searchBox && $x.identifierResults.length === 0"
        #suggestion-content="{ queryHTML }"
        :animation="suggestionsAnimation"
        :max-items-to-render="5"
        class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
      >
        <SearchIcon />
        <span v-html="queryHTML" />
      </QuerySuggestions>

      <div
        v-if="$x.nextQueries.length > 0 && $x.identifierResults.length === 0"
        class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
      >
        <h1
          class="
            x-title3
            x-text--bold x-text--secondary
            x-list x-list--horizontal x-list--gap-03 x-list--align-center
          "
        >
          <MinusIcon />
          <span>{{ $t('nextQueries.title') }}</span>
        </h1>
        <NextQueries
          :animation="suggestionsAnimation"
          :max-items-to-render="3"
          class="x-list x-list--gap-03"
        >
          <template #suggestion-content="{ suggestion }">
            <CuratedCheckIcon v-if="suggestion.isCurated" />
            <Nq4Icon v-else />
            <span>{{ suggestion.query }}</span>
          </template>
        </NextQueries>
      </div>

      <div
        v-if="$x.popularSearches.length > 0 && !$x.query.searchBox"
        class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
      >
        <h1
          class="
            x-title3
            x-text--bold x-text--secondary
            x-list x-list--horizontal x-list--gap-03 x-list--align-center
          "
        >
          <MinusIcon />
          <span>{{ $t('popularSearches.title') }}</span>
        </h1>
        <PopularSearches
          :animation="suggestionsAnimation"
          :max-items-to-render="4"
          class="x-list x-list--gap-03"
        >
          <template #suggestion-content="{ suggestion }">
            <TrendingTinyIcon />
            <span>{{ suggestion.query }}</span>
          </template>
        </PopularSearches>
      </div>
    </BaseKeyboardNavigation>
  </Empathize>
</template>

<script lang="ts">
  import {
    animateScale,
    BarCodeIcon,
    BaseKeyboardNavigation,
    BaseResultLink,
    CrossTinyIcon,
    CuratedCheckIcon,
    HistoryIcon,
    MinusIcon,
    Nq4Icon,
    SearchIcon,
    StaggeredFadeAndSlide,
    TrendingTinyIcon
  } from '@empathyco/x-components';
  import { Empathize } from '@empathyco/x-components/empathize';
  import { ClearHistoryQueries, HistoryQueries } from '@empathyco/x-components/history-queries';
  import { IdentifierResult, IdentifierResults } from '@empathyco/x-components/identifier-results';
  import { NextQueries } from '@empathyco/x-components/next-queries';
  import { PopularSearches } from '@empathyco/x-components/popular-searches';
  import { QuerySuggestions } from '@empathyco/x-components/query-suggestions';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      BarCodeIcon,
      BaseKeyboardNavigation,
      BaseResultLink,
      ClearHistoryQueries,
      CrossTinyIcon,
      CuratedCheckIcon,
      Empathize,
      HistoryIcon,
      HistoryQueries,
      IdentifierResults,
      IdentifierResult,
      MinusIcon,
      NextQueries,
      Nq4Icon,
      PopularSearches,
      QuerySuggestions,
      SearchIcon,
      TrendingTinyIcon
    }
  })
  export default class PredictiveLayer extends Vue {
    public empathizeAnimation = animateScale();
    public suggestionsAnimation = StaggeredFadeAndSlide;
  }
</script>
