<template>
  <Empathize
    :animation="empathizeAnimation"
    :has-content="showEmpathize || showIdentifierResults"
    search-and-close-on-no-content
    class="x-z-40 x-bg-neutral-0 desktop:x-w-full"
    :events-to-close-empathize="isDesktopOrGreater ? desktopCloseEvents : mobileCloseEvents"
  >
    <component
      :is="isDesktopOrGreater ? 'div' : 'BaseScroll'"
      class="x-h-full desktop:x-ml-16"
      :class="{ 'x-bg-neutral-0': showEmpathize }"
    >
      <div
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
              class="x-button-neutral x-button-sm x-button-tight x-self-end x-pr-8 x-capitalize"
            >
              {{ $t('myHistory.openButton') }}
              <SettingsIcon class="x-icon-lg" />
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

<script setup lang="ts">
import type { XEventsTypes } from '@empathyco/x-components'
import {
  animateScale,
  BaseIdModalOpen,
  BaseKeyboardNavigation,
  SettingsIcon,
  StaggeredFadeAndSlide,
  use$x,
} from '@empathyco/x-components'
import { Empathize } from '@empathyco/x-components/empathize'
import { useDevice } from '../../composables/use-device.composable'
import { usePredictiveHelpers } from '../../composables/use-predictive-helpers.composable'
import PredictiveHistoryQueries from './predictive-history-queries.vue'
import PredictiveIdentifierResults from './predictive-identifier-results.vue'
import PredictiveNextQueries from './predictive-next-queries.vue'
import PredictivePopularSearches from './predictive-popular-searches.vue'
import PredictiveQuerySuggestions from './predictive-query-suggestions.vue'
import SlidingRecommendations from './sliding-recommendations.vue'

const empathizeAnimation = animateScale()
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
</script>
<style lang="scss">
.x-result-link:focus-visible > * {
  outline: -webkit-focus-ring-color auto 1px;
}
</style>
