<template>
  <Empathize
    :animation="empathizeAnimation"
    class="desktop:x-z-[1] desktop:x-w-full"
    :class="{ 'x-bg-neutral-0': !x.query.search || isDesktopOrGreater }"
  >
    <component
      :is="isDesktopOrGreater ? 'div' : 'BaseScroll'"
      class="x-h-full desktop:x-ml-16"
      :class="{ 'x-bg-neutral-0': showEmpathize }"
    >
      <div
        v-if="showEmpathize || showIdentifierResults"
        class="x-layout-item x-pb-16 desktop:x-block desktop:x-pl-16 desktop:x-pt-16"
        :class="{ 'x-mb-40 x-border-b x-border-neutral-10': !x.query.search && isTabletOrLess }"
      >
        <BaseKeyboardNavigation
          class="x-flex x-flex-col desktop:x-grid desktop:x-grid-cols-12 desktop:x-items-start desktop:x-gap-24"
          :navigation-hijacker="navigationHijacker"
        >
          <PredictiveIdentifierResults
            v-if="showIdentifierResults"
            :animation="suggestionsAnimation"
          />

          <div
            v-else-if="showEmpathize"
            class="x-flex x-flex-col x-gap-8 x-pl-8 desktop:x-col-span-5 desktop:x-pl-0"
            :class="x.query.searchBox ? 'desktop:x-gap-4' : 'desktop:x-gap-16'"
          >
            <BaseIdModalOpen
              v-if="isTabletOrLess && !x.query.searchBox"
              modal-id="my-history-aside"
              class="x-button-neutral x-button-sm x-button-tight x-self-end x-pr-8"
            >
              {{ $t('myHistory.openButton') }}
              <SettingsIcon class="x-icon-lg" />
            </BaseIdModalOpen>
            <div v-if="showHistoryQueries" class="x-flex x-flex-col x-gap-4">
              <div v-if="!x.query.searchBox" class="x-flex x-items-center">
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
                :max-items-to-render="x.query.searchBox ? 2 : 4"
                suggestion-item-class="x-w-full"
                class="-x-mr-2 x-flex x-flex-col x-gap-8 desktop:x-gap-4"
              >
                <template #suggestion="{ suggestion }">
                  <HistoryQuery
                    class="x-suggestion-group-lg desktop:x-suggestion-group-md hover:x-no-underline"
                    :suggestion="suggestion"
                    suggestion-class="x-suggestion x-suggestion-lg desktop:x-suggestion-md"
                  >
                    <template #default="{ query }">
                      <HistoryIcon class="x-icon-lg desktop:x-icon-md" />
                      <div class="x-group x-flex x-flex-col x-gap-2">
                        <Highlight
                          :text="suggestion.query"
                          :highlight="query"
                          class="group-hover:x-underline"
                        />
                        <HistoryQueryFilters
                          class="x-w-192 desktop:x-w-128"
                          :filters-list="suggestion.selectedFilters"
                        />
                      </div>
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

            <PredictiveQuerySuggestions
              v-if="showQuerySuggestions"
              :animation="suggestionsAnimation"
            />

            <PredictiveNextQueries v-if="showNextQueries" :animation="suggestionsAnimation" />

            <PredictivePopularSearches
              v-if="showPopularSearches"
              :animation="suggestionsAnimation"
            />

            <BaseIdModalOpen
              v-if="isDesktopOrGreater && !x.query.searchBox"
              modal-id="my-history-aside"
              class="x-button-neutral x-button-sm x-button-tight x-self-start"
              data-test="my-history-button"
            >
              <SettingsIcon />
              {{ $t('myHistory.openButton') }}
            </BaseIdModalOpen>
          </div>

          <SlidingRecommendations
            v-if="isDesktopOrGreater && !x.query.searchBox"
            class="x-col-span-7"
          />
        </BaseKeyboardNavigation>
      </div>
      <SlidingRecommendations v-if="isTabletOrLess && !x.query.searchBox" />
    </component>
  </Empathize>
</template>

<script lang="ts">
import {
  animateScale,
  BaseIdModalOpen,
  BaseKeyboardNavigation,
  BaseScroll,
  CrossTinyIcon,
  Highlight,
  HistoryIcon,
  SettingsIcon,
  StaggeredFadeAndSlide,
  TrashIcon,
  use$x,
} from '@empathyco/x-components'
import { Empathize } from '@empathyco/x-components/empathize'
import {
  ClearHistoryQueries,
  HistoryQueries,
  HistoryQuery,
} from '@empathyco/x-components/history-queries'
import { defineComponent } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import { usePredictiveHelpers } from '../../composables/use-predictive-helpers.composable'
import HistoryQueryFilters from '../history-query-filters.vue'
import PredictiveIdentifierResults from './predictive-identifier-results.vue'
import PredictiveNextQueries from './predictive-next-queries.vue'
import PredictivePopularSearches from './predictive-popular-searches.vue'
import PredictiveQuerySuggestions from './predictive-query-suggestions.vue'
import SlidingRecommendations from './sliding-recommendations.vue'

export default defineComponent({
  components: {
    HistoryQueryFilters,
    BaseScroll,
    PredictivePopularSearches,
    PredictiveNextQueries,
    PredictiveQuerySuggestions,
    PredictiveIdentifierResults,
    BaseIdModalOpen,
    BaseKeyboardNavigation,
    ClearHistoryQueries,
    CrossTinyIcon,
    Empathize,
    Highlight,
    HistoryQuery,
    HistoryIcon,
    HistoryQueries,
    SlidingRecommendations,
    SettingsIcon,
    TrashIcon,
  },
  setup() {
    const empathizeAnimation = animateScale()
    const suggestionsAnimation = StaggeredFadeAndSlide
    const { isDesktopOrGreater, isTabletOrLess } = useDevice()

    const {
      navigationHijacker,
      showIdentifierResults,
      showHistoryQueries,
      showQuerySuggestions,
      showNextQueries,
      showPopularSearches,
      showEmpathize,
    } = usePredictiveHelpers()

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
      showEmpathize,
      x: use$x(),
    }
  },
})
</script>
<style lang="scss">
.x-result-link:focus > * {
  outline: -webkit-focus-ring-color auto 1px;
}
</style>
