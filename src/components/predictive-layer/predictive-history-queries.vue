<template>
  <div class="x-flex x-flex-col x-gap-4">
    <div v-if="!x.query.searchBox" class="x-flex x-min-h-32 x-items-center">
      <h1 class="x-title4 x-title4-sm x-flex-1 x-uppercase">
        {{ $t('historyQueries.title') }}
      </h1>
      <ClearHistoryQueries class="x-button-neutral x-button-sm x-button-tight x-px-8">
        <TrashIcon v-if="isTabletOrLess" class="x-icon-lg" />
        <span v-else>{{ $t('historyQueries.clear') }}</span>
      </ClearHistoryQueries>
    </div>

    <component
      :is="horizontalLayout ? SlidingPanel : 'div'"
      :show-buttons="false"
      :reset-on-content-change="false"
      button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
    >
      <HistoryQueries
        :animation="suggestionsAnimation"
        :max-items-to-render="horizontalLayout ? 5 : 2"
        class="x-gap-8 desktop:x-gap-4"
        :class="{ 'x-suggestions--horizontal': horizontalLayout }"
      >
        <template #suggestion="{ suggestion }">
          <HistoryQuery
            class="hover:x-no-underline"
            :class="{
              'x-suggestion-group-outlined': horizontalLayout,
              'x-suggestion-group-lg desktop:x-suggestion-group-md': !horizontalLayout,
            }"
            :suggestion="suggestion"
            :suggestion-class="`x-suggestion  ${!horizontalLayout ? 'x-suggestion-lg desktop:x-suggestion-md' : ''}`"
          >
            <template #default="{ query }">
              <HistoryIcon class="x-icon-lg x-mb-4 desktop:x-icon-md desktop:x-mb-0" />
              <div class="x-flex x-flex-col x-gap-2">
                <Highlight
                  :text="suggestion.query"
                  :highlight="query"
                  class="group-hover:x-no-underline"
                />
                <HistoryQueryFilters
                  class="x-w-192 desktop:x-w-128"
                  :filters-list="suggestion.selectedFilters"
                />
              </div>
            </template>

            <template #remove-button-content>
              <span
                :aria-label="$t('historyQueries.removeLabel', { suggestion: suggestion.query })"
              >
                <CrossTinyIcon class="x-icon-lg desktop:x-icon-md" />
              </span>
            </template>
          </HistoryQuery>
        </template>
      </HistoryQueries>
    </component>
  </div>
</template>
<script setup lang="ts">
import {
  CrossTinyIcon,
  Highlight,
  HistoryIcon,
  SlidingPanel,
  StaggeredFadeAndSlide,
  TrashIcon,
  use$x,
} from '@empathyco/x-components'
import {
  ClearHistoryQueries,
  HistoryQueries,
  HistoryQuery,
} from '@empathyco/x-components/history-queries'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import HistoryQueryFilters from '../history-query-filters.vue'

const suggestionsAnimation = StaggeredFadeAndSlide as any
const { isTabletOrLess } = useDevice()
const x = use$x()

const horizontalLayout = computed(() => isTabletOrLess.value && !x.query.searchBox)
</script>
