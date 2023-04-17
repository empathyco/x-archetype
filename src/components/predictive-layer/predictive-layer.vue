<template>
  <Empathize :animation="empathizeAnimation" class="x-bg-neutral-0 desktop:x-py-16 desktop:x-pl-16">
    <component
      :is="isDesktopOrGreater ? 'div' : 'BaseScroll'"
      v-if="showEmpathize || showIdentifierResults"
      class="x-h-full"
    >
      <div class="x-layout-item desktop:x-block">
        <BaseKeyboardNavigation
          class="x-flex x-flex-col desktop:x-grid desktop:x-grid-cols-12 desktop:x-items-start desktop:x-gap-24"
          :navigationHijacker="navigationHijacker"
        >
          <IdentifierResults
            v-if="showIdentifierResults"
            v-slot="{ identifierResult }"
            :maxItemsToRender="5"
            :animation="suggestionsAnimation"
            class="x-flex x-flex-col x-gap-8 desktop:x-col-span-12 desktop:x-gap-4"
          >
            <BaseResultLink
              v-slot="{ result }"
              :result="identifierResult"
              class="x-suggestion-lg x-suggestion desktop:x-suggestion-md"
            >
              <BarCodeIcon class="x-icon-lg desktop:x-icon-md" />
              <IdentifierResult :result="result" />
              <span>
                {{ result.name }}
              </span>
            </BaseResultLink>
          </IdentifierResults>

          <div
            v-else-if="showEmpathize"
            class="x-flex x-flex-col x-gap-8 x-pl-8 desktop:x-col-span-5 desktop:x-pl-0"
            :class="$x.query.searchBox ? 'desktop:x-gap-4' : 'desktop:x-gap-16'"
          >
            <BaseIdModalOpen
              v-if="isTabletOrLess && !$x.query.searchBox"
              modalId="my-history-aside"
              class="x-self-end x-button-neutral x-button-sm x-button-tight x-pr-8"
            >
              {{ $t('myHistory.openButton') }}
              <SettingsIcon class="x-icon-lg" />
            </BaseIdModalOpen>
            <div v-if="showHistoryQueries" class="x-flex x-flex-col x-gap-4">
              <div v-if="!$x.query.searchBox" class="x-flex x-items-center">
                <h1 class="x-title4 x-title4-sm x-flex-1 x-uppercase">
                  {{ $t('historyQueries.title') }}
                </h1>
                <ClearHistoryQueries class="x-button-neutral x-button-sm x-button-tight x-px-8">
                  <TrashIcon v-if="isTabletOrLess" class="x-icon-lg" />
                  <span v-else>{{ $t('historyQueries.clear') }}</span>
                </ClearHistoryQueries>
              </div>

              <HistoryQueries
                :animation="suggestionsAnimation"
                :max-items-to-render="$x.query.searchBox ? 2 : 4"
                suggestionItemClass="x-w-full"
                class="-x-mr-2 x-flex x-flex-col x-gap-8 desktop:x-gap-4"
              >
                <template #suggestion="{ suggestion }">
                  <HistoryQuery
                    class="x-suggestion-group-lg desktop:x-suggestion-group-md"
                    :suggestion="suggestion"
                    suggestionClass="x-suggestion x-suggestion-lg desktop:x-suggestion-md"
                  >
                    <template #default="{ query }">
                      <HistoryIcon class="x-icon-lg desktop:x-icon-md" />
                      <Highlight :text="suggestion.query" :highlight="query" />
                    </template>

                    <template #remove-button-content>
                      <span
                        :aria-label="
                          $t('historyQueries.removeLabel', { suggestion: suggestion.query })
                        "
                      >
                        <CrossTinyIcon class="x-icon-lg desktop:x-icon-md" />
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
              class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
            >
              <template #suggestion="{ suggestion }">
                <QuerySuggestion
                  :suggestion="suggestion"
                  class="x-suggestion-lg x-suggestion desktop:x-suggestion-md"
                >
                  <template #default="{ query }">
                    <SearchIcon class="x-icon-lg desktop:x-icon-md" />
                    <Highlight :text="suggestion.query" :highlight="query" />
                  </template>
                </QuerySuggestion>
              </template>
            </QuerySuggestions>

            <div
              v-if="showNextQueries"
              class="x-flex x-flex-col x-gap-4"
              :class="{ 'x-pt-16': $x.query.searchBox && isDesktopOrGreater }"
            >
              <h1 class="x-title4 x-title4-sm x-py-8 x-uppercase desktop:x-p-0">
                {{ $t('nextQueries.title') }}
              </h1>
              <NextQueries
                :animation="suggestionsAnimation"
                :max-items-to-render="3"
                class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
              >
                <template #suggestion="{ suggestion }">
                  <NextQuery
                    class="x-suggestion-lg x-suggestion desktop:x-suggestion-md"
                    :suggestion="suggestion"
                  >
                    <CuratedCheckIcon
                      v-if="suggestion.isCurated"
                      class="x-icon-lg desktop:x-icon-md"
                    />
                    <LightBulbOn v-else class="x-icon-lg desktop:x-icon-md" />
                    <span>{{ suggestion.query }}</span>
                  </NextQuery>
                </template>
              </NextQueries>
            </div>

            <div v-if="showPopularSearches" class="x-flex x-flex-col x-gap-4">
              <h1 class="x-title4 x-title4-sm x-uppercase">
                {{ $t('popularSearches.title') }}
              </h1>
              <PopularSearches
                :animation="suggestionsAnimation"
                :max-items-to-render="4"
                class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
              >
                <template #suggestion="{ suggestion }">
                  <PopularSearch
                    class="x-suggestion-lg x-suggestion desktop:x-suggestion-md"
                    :suggestion="suggestion"
                  >
                    <TrendingIcon class="x-icon-lg desktop:x-icon-md" />
                    <span>{{ suggestion.query }}</span>
                  </PopularSearch>
                </template>
              </PopularSearches>
            </div>
            <BaseIdModalOpen
              v-if="isDesktopOrGreater && !$x.query.searchBox"
              modalId="my-history-aside"
              class="x-self-start x-button-neutral x-button-sm x-button-tight"
              data-test="my-history-button"
            >
              <SettingsIcon />
              {{ $t('myHistory.openButton') }}
            </BaseIdModalOpen>
          </div>

          <SlidingRecommendations
            v-if="isDesktopOrGreater && !$x.query.searchBox"
            class="x-col-span-7"
          />
        </BaseKeyboardNavigation>
      </div>
      <SlidingRecommendations v-if="isTabletOrLess && !$x.query.searchBox" />
    </component>
  </Empathize>
</template>

<script lang="ts">
  import {
    BarCodeIcon,
    BaseIdModalOpen,
    BaseKeyboardNavigation,
    BaseResultLink,
    BaseScroll,
    CrossTinyIcon,
    CuratedCheckIcon,
    Highlight,
    HistoryIcon,
    LightBulbOn,
    SearchIcon,
    SettingsIcon,
    StaggeredFadeAndSlide,
    TrashIcon,
    TrendingIcon,
    animateScale,
    use$x
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
  import { defineComponent, computed } from 'vue';
  import { useDevice } from '../../composables/use-device.composable';
  import SlidingRecommendations from './sliding-recommendations.vue';

  export default defineComponent({
    components: {
      BarCodeIcon,
      BaseScroll,
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
    },
    setup() {
      const empathizeAnimation = animateScale();
      const suggestionsAnimation = StaggeredFadeAndSlide;
      const navigationHijacker = [
        { xEvent: 'UserPressedArrowKey', moduleName: 'scroll', direction: 'ArrowDown' },
        { xEvent: 'UserPressedArrowKey', moduleName: 'searchBox', direction: 'ArrowDown' }
      ];

      const $x = use$x();
      const { isDesktopOrGreater, isTabletOrLess } = useDevice();

      const showIdentifierResults = computed(() => {
        return $x.identifierResults.length > 0;
      });

      const showHistoryQueries = computed(() => {
        return $x.historyQueriesWithResults.length > 0;
      });

      const showQuerySuggestions = computed(() => {
        return (
          !!$x.query.searchBox &&
          $x.identifierResults.length === 0 &&
          $x.querySuggestions.length > 0
        );
      });

      const showNextQueries = computed(() => {
        return $x.nextQueries.length > 0 && $x.identifierResults.length === 0;
      });

      const showPopularSearches = computed(() => {
        return $x.popularSearches.length > 0 && !$x.query.searchBox;
      });

      const showEmpathize = computed(() => {
        return showHistoryQueries || showQuerySuggestions || showNextQueries || showPopularSearches;
      });

      return {
        isDesktopOrGreater,
        isTabletOrLess,
        empathizeAnimation,
        suggestionsAnimation,
        navigationHijacker,
        showIdentifierResults,
        showHistoryQueries,
        showQuerySuggestions,
        showNextQueries,
        showPopularSearches,
        showEmpathize
      };
    }
  });
</script>
<style lang="scss">
  .x-result-link:focus > * {
    outline: -webkit-focus-ring-color auto 1px;
  }
</style>
