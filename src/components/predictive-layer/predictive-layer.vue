<template>
  <Empathize
    :animation="empathizeAnimation"
    :has-content="showEmpathize || showIdentifierResults"
    search-and-close-on-no-content
    class="xds:z-40 xds:bg-neutral-0 xds:desktop:w-full xds:desktop:min-w-187.5"
    :events-to-close-empathize="isDesktopOrGreater ? desktopCloseEvents : mobileCloseEvents"
    :events-to-open-empathize="eventsToOpenEmpathize"
  >
    <component
      :is="isDesktopOrGreater ? 'div' : 'BaseScroll'"
      class="xds:h-full xds:desktop:ml-16"
      :class="{ 'xds:bg-neutral-0': showEmpathize }"
    >
      <div
        class="xds:layout-item xds:pb-16 xds:desktop:block xds:desktop:pt-16 xds:desktop:pl-16"
        :class="{
          'xds:mb-40 xds:border-b xds:border-neutral-10': !x.query.search && isTabletOrLess,
        }"
      >
        <BaseKeyboardNavigation
          class="xds:flex xds:flex-col xds:desktop:grid xds:desktop:grid-cols-12 xds:desktop:items-start xds:desktop:gap-24"
          :navigation-hijacker="navigationHijacker"
        >
          <PredictiveIdentifierResults
            v-if="showIdentifierResults"
            :animation="suggestionsAnimation"
          />

          <div
            v-else-if="showEmpathize"
            class="xds:flex xds:flex-col xds:gap-8 xds:pl-8 xds:desktop:col-span-5 xds:desktop:gap-16 xds:desktop:pl-0"
            :class="{
              'xds:desktop:gap-4!': x.query.searchBox,
              'xds:desktop:col-span-3!': fullPredictiveLayer,
              'xds:desktop:col-start-3!': fullPredictiveLayer && x.query.searchBox,
            }"
          >
            <BaseIdModalOpen
              v-if="isTabletOrLess && !x.query.searchBox"
              modal-id="my-history-aside"
              class="xds:button-sm xds:button-tight xds:self-end xds:button-neutral xds:pr-8 xds:capitalize"
            >
              {{ $t('myHistory.openButton') }}
              <SettingsIcon class="xds:icon-lg" />
            </BaseIdModalOpen>

            <PredictiveHistoryQueries v-if="showHistoryQueries" />

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
              class="xds:button-sm xds:button-tight xds:self-start xds:button-neutral"
              data-test="my-history-button"
            >
              <SettingsIcon />
              {{ $t('myHistory.openButton') }}
            </BaseIdModalOpen>
          </div>

          <SlidingRecommendations
            v-if="isDesktopOrGreater && !x.query.searchBox"
            :class="fullPredictiveLayer ? 'xds:col-span-9' : 'xds:col-span-7'"
          />
        </BaseKeyboardNavigation>
      </div>
      <SlidingRecommendations v-if="isTabletOrLess && !x.query.searchBox" />
    </component>
  </Empathize>
</template>

<script setup lang="ts">
import type { XEventsTypes } from '@empathyco/x-components'
import {
  AnimateScale,
  BaseIdModalOpen,
  BaseKeyboardNavigation,
  SettingsIcon,
  StaggeredFadeAndSlide,
  use$x,
} from '@empathyco/x-components'
import { Empathize } from '@empathyco/x-components/empathize'
import { useDevice } from '../../composables/use-device.composable'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { usePredictiveHelpers } from '../../composables/use-predictive-helpers.composable'
import { eventsToOpenEmpathize } from '../../x-components/constants'
import PredictiveHistoryQueries from './predictive-history-queries.vue'
import PredictiveIdentifierResults from './predictive-identifier-results.vue'
import PredictiveNextQueries from './predictive-next-queries.vue'
import PredictivePopularSearches from './predictive-popular-searches.vue'
import PredictiveQuerySuggestions from './predictive-query-suggestions.vue'
import SlidingRecommendations from './sliding-recommendations.vue'

const empathizeAnimation = AnimateScale
const suggestionsAnimation = StaggeredFadeAndSlide as any
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

const mobileCloseEvents: Array<keyof XEventsTypes> = [
  'UserClosedEmpathize',
  'UserSelectedASuggestion',
  'UserPressedEnterKey',
]
const desktopCloseEvents: Array<keyof XEventsTypes> = [...mobileCloseEvents, 'UserBlurredSearchBox']

const x = use$x()
const { getControlFromPath } = useExperienceControls()
const fullPredictiveLayer = getControlFromPath('fullPredictiveLayer')
</script>

<style>
.x-result-link:focus-visible > * {
  outline: -webkit-focus-ring-color auto 1px;
}
</style>
