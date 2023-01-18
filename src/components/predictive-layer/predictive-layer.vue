<template>
  <Empathize v-if="showEmpathize" :animation="empathizeAnimation" class="x-list">
    <BaseKeyboardNavigation
      class="x-row x-row--gap-06 x-row--align-start"
      :navigationHijacker="navigationHijacker"
    >
      <IdentifierResults
        v-if="showIdentifierResults"
        v-slot="{ identifierResult }"
        :maxItemsToRender="5"
        :animation="suggestionsAnimation"
        class="x-row__item x-row__item--span-12 x-list x-padding--05"
        :class="$x.device === 'mobile' ? 'x-list--gap-03 x-padding--top-00' : 'x-list--gap-02'"
      >
        <BaseResultLink v-slot="{ result }" :result="identifierResult" class="x-suggestion">
          <BarCodeIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
          <IdentifierResult :result="result" class="x-text x-font-bold" />
          <span class="x-text x-font-bold x-ellipsis">
            {{ result.name }}
          </span>
        </BaseResultLink>
      </IdentifierResults>

      <div
        v-else
        class="x-row__item x-list x-padding--05"
        :class="[
          $x.query.searchBox
            ? $x.device === 'mobile'
              ? 'x-list--gap-03'
              : 'x-list--gap-02'
            : 'x-list--gap-05',
          $x.device === 'mobile'
            ? 'x-row__item--span-12 x-padding--top-00 x-padding--bottom-00'
            : 'x-row__item--span-5 x-padding--right-00'
        ]"
      >
        <BaseIdModalOpen
          v-if="$x.device === 'mobile' && !$x.query.searchBox"
          modalId="my-history-aside"
          class="x-button-sm x-button-tight x-self-end x-padding--right-03 x-border-width--00"
        >
          {{ $t('myHistory.openButton') }}
          <SettingsIcon class="x-icon--l" />
        </BaseIdModalOpen>
        <div v-if="showHistoryQueries" class="x-list x-list--gap-02">
          <div v-if="!$x.query.searchBox" class="x-list x-list--horizontal x-list--align-center">
            <h1 class="x-title4 x-title4-sm x-uppercase x-list__item--expand">
              {{ $t('historyQueries.title') }}
            </h1>
            <ClearHistoryQueries
              class="
                x-button-tight x-button-sm
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
            suggestionItemClass="x-w-full"
            class="x-list"
            :class="
              $x.device === 'mobile' ? 'x-list--gap-03' : 'x-list--gap-02 x-list--align-start'
            "
          >
            <template #suggestion="{ suggestion }">
              <HistoryQuery
                class="x-suggestion-group-lg desktop:x-suggestion-group-md"
                :suggestion="suggestion"
                suggestionClass="x-suggestion-lg desktop:x-suggestion-md"
              >
                <template #default="{ query }">
                  <HistoryIcon :class="{ 'x-icon-lg': $x.device === 'mobile' }" />
                  <Highlight :text="suggestion.query" :highlight="query" />
                </template>

                <template #remove-button-content>
                  <span
                    :aria-label="$t('historyQueries.removeLabel', { suggestion: suggestion.query })"
                  >
                    <CrossTinyIcon :class="{ 'x-icon-lg': $x.device === 'mobile' }" />
                  </span>
                </template>
              </HistoryQuery>
            </template>
          </HistoryQueries>
        </div>

        <QuerySuggestions
          v-if="showQuerySuggestions"
          :animation="suggestionsAnimation"
          :max-items-to-render="5"
          class="x-row__item x-row__item--span-4 x-list"
          :class="$x.device === 'mobile' ? 'x-list--gap-03' : 'x-list--gap-02'"
        >
          <template #suggestion="{ suggestion, query }">
            <QuerySuggestion
              :suggestion="suggestion"
              class="x-suggestion-group-lg desktop:x-suggestion-group-md"
            >
              <SearchIcon :class="{ 'x-icon-lg': $x.device === 'mobile' }" />
              <Highlight :text="suggestion.query" :highlight="query" />
            </QuerySuggestion>
          </template>
        </QuerySuggestions>

        <div
          v-if="showNextQueries"
          class="x-list x-list--gap-02"
          :class="{ 'x-padding--top-05': $x.query.searchBox && $x.device === 'desktop' }"
        >
          <h1
            class="x-title4 x-title4-sm x-uppercase"
            :class="{ 'x-padding--top-03 x-padding--bottom-03': $x.device === 'mobile' }"
          >
            {{ $t('nextQueries.title') }}
          </h1>
          <NextQueries
            :animation="suggestionsAnimation"
            :max-items-to-render="3"
            class="x-list"
            :class="$x.device === 'mobile' ? 'x-list--gap-03' : 'x-list--gap-02'"
          >
            <template #suggestion="{ suggestion }">
              <NextQuery
                class="x-suggestion-group-lg desktop:x-suggestion-group-md"
                :suggestion="suggestion"
              >
                <CuratedCheckIcon
                  v-if="suggestion.isCurated"
                  :class="{ 'x-icon-lg': $x.device === 'mobile' }"
                />
                <LightBulbOn
                  v-else
                  class="x-icon--light-bulb-on"
                  :class="{ 'x-icon-lg': $x.device === 'mobile' }"
                />
                <span>{{ suggestion.query }}</span>
              </NextQuery>
            </template>
          </NextQueries>
        </div>

        <div v-if="showPopularSearches" class="x-list x-list--gap-02">
          <h1 class="x-title4 x-title4-sm x-uppercase">
            {{ $t('popularSearches.title') }}
          </h1>
          <PopularSearches
            :animation="suggestionsAnimation"
            :max-items-to-render="4"
            class="x-list x-list--gap-02"
          >
            <template #suggestion="{ suggestion }">
              <PopularSearch
                class="x-suggestion-group-lg desktop:x-suggestion-group-md"
                :suggestion="suggestion"
              >
                <TrendingIcon :class="{ 'x-icon-lg': $x.device === 'mobile' }" />
                <span>{{ suggestion.query }}</span>
              </PopularSearch>
            </template>
          </PopularSearches>
        </div>
        <BaseIdModalOpen
          v-if="$x.device === 'desktop' && !$x.query.searchBox"
          modalId="my-history-aside"
          class="x-button-sm x-button-tight x-self-start"
        >
          <SettingsIcon />
          {{ $t('myHistory.openButton') }}
        </BaseIdModalOpen>
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
    BaseIdModalOpen,
    BaseKeyboardNavigation,
    BaseResultLink,
    CrossTinyIcon,
    CuratedCheckIcon,
    Highlight,
    HistoryIcon,
    LightBulbOn,
    SearchIcon,
    SettingsIcon,
    StaggeredFadeAndSlide,
    TrashIcon,
    TrendingIcon
  } from '@empathyco/x-components';
  import { Empathize } from '@empathyco/x-components/empathize';
  import {
    ClearHistoryQueries,
    HistoryQueries,
    HistoryQuery
  } from '@empathyco/x-components/history-queries';
  import { IdentifierResult, IdentifierResults } from '@empathyco/x-components/identifier-results';
  import { NextQueries, NextQuery } from '@empathyco/x-components/next-queries';
  import { PopularSearches, PopularSearch } from '@empathyco/x-components/popular-searches';
  import { QuerySuggestions, QuerySuggestion } from '@empathyco/x-components/query-suggestions';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import SlidingRecommendations from './sliding-recommendations.vue';

  @Component({
    components: {
      BarCodeIcon,
      BaseIdModalOpen,
      BaseKeyboardNavigation,
      BaseResultLink,
      ClearHistoryQueries,
      CrossTinyIcon,
      CuratedCheckIcon,
      Empathize,
      Highlight,
      HistoryQuery,
      HistoryIcon,
      HistoryQueries,
      IdentifierResults,
      IdentifierResult,
      LightBulbOn,
      NextQuery,
      NextQueries,
      PopularSearch,
      PopularSearches,
      QuerySuggestion,
      QuerySuggestions,
      SlidingRecommendations,
      SearchIcon,
      SettingsIcon,
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
<style lang="scss">
  .x-result-link:focus > * {
    outline: -webkit-focus-ring-color auto 1px;
  }
</style>
