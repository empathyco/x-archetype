<template>
  <div class="xds:flex xds:flex-col xds:gap-4">
    <div v-if="!x.query.searchBox" class="xds:flex xds:min-h-32 xds:items-center">
      <h1 class="xds:flex-1 xds:title4 xds:title4-sm xds:uppercase">
        {{ $t('historyQueries.title') }}
      </h1>
      <ClearHistoryQueries class="xds:button-sm xds:button-tight xds:button-neutral xds:px-8">
        <TrashIcon v-if="isTabletOrLess" class="xds:icon-lg" />
        <span v-else>{{ $t('historyQueries.clear') }}</span>
      </ClearHistoryQueries>
    </div>

    <component
      :is="horizontalLayout ? SlidingPanel : 'div'"
      :show-buttons="false"
      :reset-on-content-change="false"
      button-class="xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
    >
      <HistoryQueries
        :animation="suggestionsAnimation"
        :max-items-to-render="horizontalLayout ? 5 : 2"
        class="xds:gap-8 xds:desktop:gap-4"
        :class="{ 'xds:suggestions--horizontal': horizontalLayout }"
      >
        <template #suggestion="{ suggestion }">
          <HistoryQuery
            class="xds:hover:no-underline"
            :class="{
              'xds:suggestion-group-outlined': horizontalLayout,
              'xds:suggestion-group-lg xds:desktop:suggestion-group-md': !horizontalLayout,
            }"
            :suggestion="suggestion"
            :suggestion-class="`xds:suggestion  ${!horizontalLayout ? 'xds:suggestion-lg xds:desktop:suggestion-md' : ''}`"
          >
            <template #default="{ query }">
              <HistoryIcon class="xds:mb-4 xds:icon-lg xds:desktop:mb-0 xds:desktop:icon-md" />
              <div class="xds:flex xds:flex-col xds:gap-2">
                <Highlight
                  :text="suggestion.query"
                  :highlight="query"
                  class="xds:group-hover:no-underline"
                />
                <HistoryQueryFilters
                  class="xds:w-192 xds:desktop:w-128"
                  :filters-list="suggestion.selectedFilters"
                />
              </div>
            </template>

            <template #remove-button-content>
              <span
                :aria-label="$t('historyQueries.removeLabel', { suggestion: suggestion.query })"
              >
                <CrossTinyIcon class="xds:icon-lg xds:desktop:icon-md" />
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
