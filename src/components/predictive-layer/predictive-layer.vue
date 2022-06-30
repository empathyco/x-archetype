<template>
  <Empathize v-if="showEmpathize" :animation="empathizeAnimation" class="x-list">
    <BaseKeyboardNavigation
      class="x-row x-row--gap-06 x-row--align-start"
      :class="{ 'x-row--padding--top-00': $x.device === 'mobile' }"
      :navigationHijacker="navigationHijacker"
    >
      <IdentifierResults
        v-if="showIdentifierResults"
        v-slot="{ identifierResult }"
        :maxItemsToRender="5"
        :animation="suggestionsAnimation"
        class="x-row__item x-row__item--span-12 x-list x-list--gap-03 x-padding--05"
      >
        <BaseResultLink v-slot="{ result }" :result="identifierResult" class="x-suggestion">
          <BarCodeIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
          <IdentifierResult :result="result" class="x-text x-text--bold" />
          <span class="x-text x-text--bold x-ellipsis">
            {{ result.name }}
          </span>
        </BaseResultLink>
      </IdentifierResults>

      <div
        v-else
        class="x-row__item x-list x-padding--05"
        :class="[
          $x.query.searchBox ? 'x-list--gap-03' : 'x-list--gap-06',
          $x.device === 'mobile'
            ? 'x-row__item--span-12 x-padding--bottom-00'
            : 'x-row__item--span-5 x-padding--right-00'
        ]"
      >
        <div v-if="showHistoryQueries" class="x-list x-list--gap-04">
          <div v-if="!$x.query.searchBox" class="x-list x-list--horizontal x-list--align-center">
            <h1 class="x-small x-text--bold x-text--secondary x-list__item--expand">
              {{ $t('historyQueries.title') }}
            </h1>
            <ClearHistoryQueries
              class="
                x-button--ghost
                x-small
                x-text--bold x-text--secondary
                x-padding--left-03 x-padding--right-03
                x-border-width--00
              "
            >
              <TrashIcon v-if="$x.device === 'mobile'" class="x-icon--l" />
              <span v-else>{{ $t('historyQueries.clear') }}</span>
            </ClearHistoryQueries>
          </div>

          <HistoryQueries
            :animation="suggestionsAnimation"
            :max-items-to-render="$x.query.searchBox ? 2 : 4"
            class="x-list x-list--gap-03"
            :class="{ 'x-list--align-start': $x.device === 'desktop' }"
          >
            <template #suggestion-content="{ queryHTML }">
              <HistoryIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
              <span v-html="queryHTML" />
            </template>

            <template #suggestion-remove-content="{ suggestion }">
              <span
                :aria-label="$t('historyQueries.removeLabel', { suggestion: suggestion.query })"
              >
                <CrossTinyIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
              </span>
            </template>
          </HistoryQueries>
        </div>

        <QuerySuggestions
          v-if="showQuerySuggestions"
          #suggestion-content="{ queryHTML }"
          :animation="suggestionsAnimation"
          :max-items-to-render="5"
          class="x-row__item x-row__item--span-4 x-list x-list--gap-03"
        >
          <SearchIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
          <span v-html="queryHTML" />
        </QuerySuggestions>

        <div
          v-if="showNextQueries"
          class="x-list x-list--gap-04"
          :class="{ 'x-padding--top-06': $x.query.searchBox }"
        >
          <h1 class="x-small x-text--bold x-text--secondary">
            {{ $t('nextQueries.title') }}
          </h1>
          <NextQueries
            :animation="suggestionsAnimation"
            :max-items-to-render="3"
            class="x-list x-list--gap-03"
          >
            <template #suggestion-content="{ suggestion }">
              <CuratedCheckIcon
                v-if="suggestion.isCurated"
                :class="{ 'x-icon--l': $x.device === 'mobile' }"
              />
              <LightBulbOn
                v-else
                class="x-icon--light-bulb-on"
                :class="{ 'x-icon--l': $x.device === 'mobile' }"
              />
              <span>{{ suggestion.query }}</span>
            </template>
          </NextQueries>
        </div>

        <div v-if="showPopularSearches" class="x-list x-list--gap-04">
          <h1 class="x-small x-text--bold x-text--secondary">
            {{ $t('popularSearches.title') }}
          </h1>
          <PopularSearches
            :animation="suggestionsAnimation"
            :max-items-to-render="4"
            class="x-list x-list--gap-03"
          >
            <template #suggestion-content="{ suggestion }">
              <TrendingIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
              <span>{{ suggestion.query }}</span>
            </template>
          </PopularSearches>
        </div>
      </div>

      <SlidingRecommendations
        v-if="!$x.query.searchBox"
        class="x-row__item"
        :class="
          $x.device === 'mobile'
            ? 'x-row__item--span-12'
            : 'x-row__item--start-6 x-row__item--span-7'
        "
      />
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
    LightBulbOn,
    SearchIcon,
    StaggeredFadeAndSlide,
    TrashIcon,
    TrendingIcon
  } from '@empathyco/x-components';
  import { Empathize } from '@empathyco/x-components/empathize';
  import { ClearHistoryQueries, HistoryQueries } from '@empathyco/x-components/history-queries';
  import { IdentifierResult, IdentifierResults } from '@empathyco/x-components/identifier-results';
  import { NextQueries } from '@empathyco/x-components/next-queries';
  import { PopularSearches } from '@empathyco/x-components/popular-searches';
  import { QuerySuggestions } from '@empathyco/x-components/query-suggestions';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import SlidingRecommendations from './sliding-recommendations.vue';

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
      LightBulbOn,
      NextQueries,
      PopularSearches,
      QuerySuggestions,
      SlidingRecommendations,
      SearchIcon,
      TrashIcon,
      TrendingIcon
    }
  })
  export default class PredictiveLayer extends Vue {
    public empathizeAnimation = animateScale();
    public suggestionsAnimation = StaggeredFadeAndSlide;
    public navigationHijacker = [
      { xEvent: 'UserPressedArrowKey', moduleName: 'scroll', direction: 'ArrowDown' },
      { xEvent: 'UserPressedArrowKey', moduleName: 'searchBox', direction: 'ArrowDown' }
    ];

    public get showIdentifierResults(): boolean {
      return this.$x.identifierResults.length > 0;
    }

    public get showHistoryQueries(): boolean {
      return this.$x.historyQueries.length > 0;
    }

    public get showQuerySuggestions(): boolean {
      return (
        !!this.$x.query.searchBox &&
        this.$x.identifierResults.length === 0 &&
        this.$x.querySuggestions.length > 0
      );
    }

    public get showNextQueries(): boolean {
      return this.$x.nextQueries.length > 0 && this.$x.identifierResults.length === 0;
    }

    public get showPopularSearches(): boolean {
      return this.$x.popularSearches.length > 0 && !this.$x.query.searchBox;
    }

    public get showEmpathize(): boolean {
      return (
        this.showIdentifierResults ||
        this.showHistoryQueries ||
        this.showQuerySuggestions ||
        this.showNextQueries ||
        this.showPopularSearches
      );
    }
  }
</script>
<style lang="scss" scoped>
  .x-clear-history-queries {
    --x-size-height-button-default: 0;
  }
  .x-result-link:focus > * {
    outline: -webkit-focus-ring-color auto 1px;
  }
</style>
