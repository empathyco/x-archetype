<template>
  <BaseIdModalClose modal-id="my-history-aside">
    <template #closing-element="{ closeModal }">
      <MyHistory
        v-if="x.isHistoryQueriesEnabled && x.fullHistoryQueries.length"
        :animation="animation"
        queries-list-class="xds:gap-16"
      >
        <template #date="{ date }">
          <h2 class="xds:py-16 xds:font-family-alternative xds:text-lg xds:font-bold xds:text-font">
            {{ date }}
          </h2>
        </template>

        <template #suggestion="{ suggestion, formatTime }">
          <HistoryQuery
            data-test="my-history-query"
            :suggestion="suggestion"
            suggestion-class="xds:suggestion xds:gap-16!"
            class="xds:text-font xds:hover:no-underline"
            @click="closeModal"
          >
            <HistoryIcon class="xds:icon-lg!" />

            <div class="xds:group xds:flex xds:flex-col xds:gap-8">
              <h3 class="xds:text-md xds:group-hover:underline">
                {{ suggestion.query }}
              </h3>

              <HistoryQueryFilters
                :show-length="true"
                class="xds:w-224 xds:desktop:w-320"
                :filters-list="suggestion.selectedFilters"
              />

              <p class="xds:text-md">
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
              <CrossTinyIcon class="xds:icon-lg!" />
            </template>
          </HistoryQuery>
        </template>
      </MyHistory>
    </template>
  </BaseIdModalClose>
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

const animation = StaggeredFadeAndSlide
const x = use$x()
</script>
