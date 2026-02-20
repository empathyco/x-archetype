<template>
  <div class="x-flex x-flex-col x-gap-4">
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
            <span :aria-label="$t('historyQueries.removeLabel', { suggestion: suggestion.query })">
              <CrossTinyIcon class="x-icon-lg desktop:x-icon-md" />
            </span>
          </template>
        </HistoryQuery>
      </template>
    </HistoryQueries>
  </div>
</template>
<script setup lang="ts">
import {
  CrossTinyIcon,
  Highlight,
  HistoryIcon,
  StaggeredFadeAndSlide,
  TrashIcon,
  use$x,
} from '@empathyco/x-components'
import {
  ClearHistoryQueries,
  HistoryQueries,
  HistoryQuery,
} from '@empathyco/x-components/history-queries'
import { useDevice } from '../../composables/use-device.composable'
import HistoryQueryFilters from '../history-query-filters.vue'

const suggestionsAnimation = StaggeredFadeAndSlide as any
const { isTabletOrLess } = useDevice()
const x = use$x()
</script>
