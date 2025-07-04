<template>
  <div class="x-relative x-z-10">
    <Empathize
      :animation="empathizeAnimation"
      class="x-layout-item x-absolute x-z-[1] x-w-full x-bg-neutral-0"
      @empathize-opened="handleEmpathizeEvent('EmpathizeOpened')"
      @empathize-closed="handleEmpathizeEvent('EmpathizeClosed')"
    >
      <MaxDesktopWidthItem>
        <DesktopSearchboxAlign>
          <div class="x-layout-item">
            <div v-if="showEmpathize || showIdentifierResults" class="x-h-full x-py-16 x-pl-[17px]">
              <div class="x-block">
                <BaseKeyboardNavigation
                  class="x-flex x-items-start x-gap-24"
                  :navigation-hijacker="navigationHijacker"
                >
                  <PredictiveIdentifierResults
                    v-if="showIdentifierResults"
                    :animation="suggestionsAnimation"
                  />

                  <div
                    v-else-if="showEmpathize"
                    class="x-grid x-grid-cols-4 x-flex-row x-gap-4"
                    :class="x.query.searchBox ? 'x-gap-4' : 'x-gap-16'"
                  >
                    <div class="x-col-span-4 x-grid x-grid-cols-4 x-gap-32">
                      <div v-if="showHistoryQueries" class="x-flex x-flex-col x-gap-4">
                        <h1 v-if="!x.query.searchBox" class="x-title4 x-title4-sm x-uppercase">
                          {{ $t('historyQueries.title') }}
                        </h1>

                        <HistoryQueries
                          :animation="suggestionsAnimation"
                          :max-items-to-render="x.query.searchBox ? 2 : 4"
                          suggestion-item-class="x-w-full"
                          class="-x-mr-2 x-flex x-flex-col x-gap-4"
                        >
                          <template #suggestion="{ suggestion }">
                            <HistoryQuery
                              class="x-suggestion-group-md hover:x-no-underline"
                              :suggestion="suggestion"
                              suggestion-class="x-suggestion x-suggestion-md"
                            >
                              <template #default="{ query }">
                                <HistoryIcon class="x-icon-md" />
                                <div class="x-group x-flex x-flex-col x-gap-2">
                                  <Highlight
                                    :text="suggestion.query"
                                    :highlight="query"
                                    class="group-hover:x-underline"
                                  />
                                  <HistoryQueryFilters
                                    class="x-w-128"
                                    :filters-list="suggestion.selectedFilters"
                                  />
                                </div>
                              </template>

                              <template #remove-button-content>
                                <span
                                  :aria-label="
                                    $t('historyQueries.removeLabel', {
                                      suggestion: suggestion.query,
                                    })
                                  "
                                >
                                  <CrossTinyIcon class="x-icon-md" />
                                </span>
                              </template>
                            </HistoryQuery>
                          </template>
                        </HistoryQueries>

                        <ClearHistoryQueries
                          v-if="!x.query.searchBox"
                          class="x-button-neutral x-button-sm x-button-tight x-w-fit"
                        >
                          <TrashIcon v-if="isTabletOrLess" class="x-icon-lg" />
                          <span v-else>{{ $t('historyQueries.clear') }}</span>
                        </ClearHistoryQueries>

                        <PredictiveQuerySuggestions
                          v-if="x.query.searchBox && showQuerySuggestions"
                          :animation="suggestionsAnimation"
                        />
                      </div>

                      <PredictiveQuerySuggestions
                        v-if="(!x.query.searchBox || !showHistoryQueries) && showQuerySuggestions"
                        :animation="suggestionsAnimation"
                      />

                      <PredictivePopularSearches
                        v-if="showPopularSearches"
                        :animation="suggestionsAnimation"
                      />

                      <PredictiveNextQueries
                        v-if="showNextQueries"
                        :class="{ 'x-pt-8': x.query.searchBox && isDesktopOrGreater }"
                        :animation="suggestionsAnimation"
                      />

                      <BaseIdModalOpen
                        v-if="isDesktopOrGreater && !x.query.searchBox"
                        modal-id="my-history-aside"
                        class="x-button-neutral x-button-sm x-button-tight x-col-start-[-1] x-self-start x-capitalize"
                        data-test="my-history-button"
                      >
                        <SettingsIcon />
                        {{ $t('myHistory.openButton') }}
                      </BaseIdModalOpen>
                    </div>

                    <SlidingRecommendations
                      v-if="isDesktopOrGreater && !x.query.searchBox"
                      class="x-col-span-4 x-pt-16"
                    />
                  </div>
                </BaseKeyboardNavigation>
              </div>
              <SlidingRecommendations v-if="isTabletOrLess && !x.query.searchBox" />
            </div>
          </div>
        </DesktopSearchboxAlign>
      </MaxDesktopWidthItem>
    </Empathize>

    <div v-if="showEmpathize" class="x-opacity-30">
      <Fade tag="div">
        <div
          v-if="showOverlay"
          class="x-layout-item x-fixed x-h-screen x-w-full x-bg-neutral-100"
        ></div>
      </Fade>
    </div>
  </div>
</template>

<script lang="ts">
import {
  animateScale,
  BaseIdModalOpen,
  BaseKeyboardNavigation,
  CrossTinyIcon,
  Fade,
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
import { defineComponent, ref } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import { usePredictiveHelpers } from '../../composables/use-predictive-helpers.composable'
import DesktopSearchboxAlign from '../desktop/desktop-searchbox-align.vue'
import HistoryQueryFilters from '../history-query-filters.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import PredictiveIdentifierResults from './predictive-identifier-results.vue'
import PredictiveNextQueries from './predictive-next-queries.vue'
import PredictivePopularSearches from './predictive-popular-searches.vue'
import PredictiveQuerySuggestions from './predictive-query-suggestions.vue'
import SlidingRecommendations from './sliding-recommendations.vue'

export default defineComponent({
  components: {
    HistoryQueryFilters,
    DesktopSearchboxAlign,
    MaxDesktopWidthItem,
    PredictiveQuerySuggestions,
    PredictivePopularSearches,
    PredictiveNextQueries,
    PredictiveIdentifierResults,
    BaseIdModalOpen,
    BaseKeyboardNavigation,
    ClearHistoryQueries,
    CrossTinyIcon,
    Fade,
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

    const showOverlay = ref(false)

    let previousBodyOverflow = ''
    let previousHTMLOverflow = ''

    const disableScroll = (): void => {
      previousBodyOverflow = document.body.style.overflow
      previousHTMLOverflow = document.documentElement.style.overflow
      document.body.style.overflow = document.documentElement.style.overflow = 'hidden'
    }

    const enableScroll = (): void => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHTMLOverflow
    }

    const handleEmpathizeEvent = (event: 'EmpathizeOpened' | 'EmpathizeClosed'): void => {
      showOverlay.value = event === 'EmpathizeOpened'

      if (showOverlay.value) {
        disableScroll()
      } else {
        enableScroll()
      }
    }

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
      showOverlay,
      handleEmpathizeEvent,
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
