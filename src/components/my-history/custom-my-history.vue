<template>
  <div class="xds:flex-1">
    <BaseIdModalClose modal-id="my-history-aside">
      <template #closing-element="{ closeModal }">
        <MyHistory
          v-if="x.isHistoryQueriesEnabled && x.fullHistoryQueries.length"
          :animation="animation"
          class="xds:px-16 xds:pb-32 xds:desktop:pl-32"
          queries-list-class="xds:gap-16"
        >
          <template #date="{ date }">
            <div class="xds:py-16 xds:title4 xds:title4-sm xds:text-neutral-75">{{ date }}</div>
          </template>

          <template #suggestion="{ suggestion, formatTime }">
            <HistoryQuery
              data-test="my-history-query"
              :suggestion="suggestion"
              suggestion-class="xds:suggestion"
              class="xds:hover:no-underline"
              @click="closeModal"
            >
              <HistoryIcon class="xds:max-desktop:icon-lg" />

              <div class="xds:group xds:flex xds:flex-col xds:gap-2">
                <p class="xds:group-hover:underline">{{ suggestion.query }}</p>

                <HistoryQueryFilters
                  :show-length="true"
                  class="xds:w-224 xds:desktop:w-320"
                  :filters-list="suggestion.selectedFilters"
                />

                <p class="xds:text1 xds:text1-sm xds:text-neutral-75">
                  {{ formatTime(suggestion.timestamp) }}
                  <template v-if="suggestion.totalResults !== undefined">
                    -
                    {{
                      $t('myHistory.suggestionResults', suggestion.totalResults, {
                        count: suggestion.totalResults,
                      })
                    }}
                  </template>
                </p>
              </div>

              <template #remove-button-content>
                <CrossTinyIcon class="xds:icon-lg" />
              </template>
            </HistoryQuery>
          </template>
        </MyHistory>

        <div v-else />
      </template>
    </BaseIdModalClose>
  </div>
</template>

<script setup lang="ts">
import {
  BaseIdModalClose,
  CrossTinyIcon,
  HistoryIcon,
  StaggeredFadeAndSlide,
  use$x,
} from '@empathyco/x-components'
import { HistoryQuery, MyHistory } from '@empathyco/x-components/history-queries'
import HistoryQueryFilters from '../history-query-filters.vue'

const animation = StaggeredFadeAndSlide as any
const x = use$x()
</script>
