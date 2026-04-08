<template>
  <div class="xds:relative xds:z-10">
    <Empathize
      :animation="empathizeAnimation"
      :has-content="showEmpathize || showIdentifierResults"
      search-and-close-on-no-content
      class="xds:absolute xds:z-1 xds:layout-item xds:w-full xds:bg-neutral-0"
      :events-to-open-empathize="eventsToOpenEmpathize"
      @empathize-opened="handleEmpathizeEvent('EmpathizeOpened')"
      @empathize-closed="handleEmpathizeEvent('EmpathizeClosed')"
    >
      <MaxDesktopWidthItem>
        <DesktopSearchboxAlign>
          <div class="xds:layout-item">
            <div class="xds:h-full xds:py-16">
              <div class="xds:block">
                <BaseKeyboardNavigation
                  class="xds:flex xds:items-start xds:gap-24"
                  :navigation-hijacker="navigationHijacker"
                >
                  <PredictiveIdentifierResults
                    v-if="showIdentifierResults"
                    :animation="suggestionsAnimation"
                  />

                  <div
                    v-else-if="showEmpathize"
                    class="xds:grid xds:grid-cols-4 xds:flex-row xds:gap-4"
                    :class="x.query.searchBox ? 'xds:gap-4' : 'xds:gap-16'"
                  >
                    <div class="xds:col-span-4 xds:grid xds:grid-cols-4 xds:gap-32">
                      <div v-if="showHistoryQueries" class="xds:flex xds:flex-col xds:gap-4">
                        <div class="xds:flex xds:min-h-32 xds:items-center">
                          <h1
                            v-if="!x.query.searchBox"
                            class="xds:title4 xds:title4-sm xds:uppercase"
                          >
                            {{ $t('historyQueries.title') }}
                          </h1>
                        </div>

                        <HistoryQueries
                          :animation="suggestionsAnimation"
                          :max-items-to-render="x.query.searchBox ? 2 : 4"
                          suggestion-item-class="xds:w-full"
                          class="xds:-mr-2 xds:flex xds:flex-col xds:gap-4"
                        >
                          <template #suggestion="{ suggestion }">
                            <HistoryQuery
                              class="xds:suggestion-group-md xds:hover:no-underline"
                              :suggestion="suggestion"
                              suggestion-class="xds:suggestion xds:suggestion-md"
                            >
                              <template #default="{ query }">
                                <HistoryIcon class="xds:icon-md" />
                                <div class="xds:group xds:flex xds:flex-col xds:gap-2">
                                  <Highlight
                                    :text="suggestion.query"
                                    :highlight="query"
                                    class="xds:group-hover:underline"
                                  />
                                  <HistoryQueryFilters
                                    class="xds:w-128"
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
                                  <CrossTinyIcon class="xds:icon-md" />
                                </span>
                              </template>
                            </HistoryQuery>
                          </template>
                        </HistoryQueries>

                        <ClearHistoryQueries
                          v-if="!x.query.searchBox"
                          class="xds:button-sm xds:w-fit xds:button-tight xds:button-neutral"
                        >
                          <TrashIcon v-if="isTabletOrLess" class="xds:icon-lg" />
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
                        :class="{ 'xds:pt-8': x.query.searchBox && isDesktopOrGreater }"
                        :animation="suggestionsAnimation"
                      />

                      <BaseIdModalOpen
                        v-if="isDesktopOrGreater && !x.query.searchBox"
                        modal-id="my-history-aside"
                        class="xds:-col-start-1 xds:button-sm xds:button-tight xds:self-start xds:button-neutral xds:capitalize"
                        data-test="my-history-button"
                      >
                        <SettingsIcon />
                        {{ $t('myHistory.openButton') }}
                      </BaseIdModalOpen>
                    </div>

                    <SlidingRecommendations
                      v-if="isDesktopOrGreater && !x.query.searchBox"
                      class="xds:col-span-4 xds:pt-16"
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

    <div v-if="showEmpathize" class="xds:opacity-30">
      <Fade tag="div">
        <div
          v-if="showOverlay"
          class="xds:fixed xds:layout-item xds:h-screen xds:w-full xds:bg-neutral-100"
        ></div>
      </Fade>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AnimateScale,
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
import { ref } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import { usePredictiveHelpers } from '../../composables/use-predictive-helpers.composable'
import { eventsToOpenEmpathize } from '../../x-components/constants'
import DesktopSearchboxAlign from '../desktop/desktop-searchbox-align.vue'
import HistoryQueryFilters from '../history-query-filters.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import PredictiveIdentifierResults from './predictive-identifier-results.vue'
import PredictiveNextQueries from './predictive-next-queries.vue'
import PredictivePopularSearches from './predictive-popular-searches.vue'
import PredictiveQuerySuggestions from './predictive-query-suggestions.vue'
import SlidingRecommendations from './sliding-recommendations.vue'

const empathizeAnimation = AnimateScale
const suggestionsAnimation = StaggeredFadeAndSlide as any

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

const x = use$x()
</script>

<style>
.x-result-link:focus-visible > * {
  outline: -webkit-focus-ring-color auto 1px;
}
</style>
