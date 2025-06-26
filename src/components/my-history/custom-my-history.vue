<template>
  <div class="x-flex-1">
    <BaseIdModalClose modal-id="my-history-aside">
      <template #closing-element="{ closeModal }">
        <MyHistory
          v-if="x.isHistoryQueriesEnabled && x.fullHistoryQueries.length"
          :animation="animation"
          class="x-px-16 x-pb-32 desktop:x-pl-32"
          queries-list-class="x-gap-16"
        >
          <template #date="{ date }">
            <div class="x-title4 x-title4-sm x-py-16 x-text-neutral-75">{{ date }}</div>
          </template>

          <template #suggestion="{ suggestion, formatTime }">
            <HistoryQuery
              data-test="my-history-query"
              :suggestion="suggestion"
              suggestion-class="x-suggestion"
              class="hover:x-no-underline"
              @click="closeModal"
            >
              <HistoryIcon class="max-desktop:x-icon-lg" />

              <div class="x-group x-flex x-flex-col x-gap-2">
                <p class="group-hover:x-underline">{{ suggestion.query }}</p>

                <HistoryQueryFilters
                  :show-length="true"
                  class="x-w-224 desktop:x-w-320"
                  :filters-list="suggestion.selectedFilters"
                />

                <p class="x-text1 x-text1-sm x-text-neutral-75">
                  {{ formatTime(suggestion.timestamp) }}
                  <template v-if="suggestion.totalResults !== undefined">
                    -
                    {{
                      $t('myHistory.suggestionResults', suggestion.totalResults, { count: suggestion.totalResults })
                    }}
                  </template>
                </p>
              </div>

              <template #remove-button-content>
                <CrossTinyIcon class="x-icon-lg" />
              </template>
            </HistoryQuery>
          </template>
        </MyHistory>

        <div v-else />
      </template>
    </BaseIdModalClose>
  </div>
</template>

<script lang="ts">
import {
  BaseIdModalClose,
  CrossTinyIcon,
  HistoryIcon,
  StaggeredFadeAndSlide,
  use$x,
} from '@empathyco/x-components'
import { HistoryQuery, MyHistory } from '@empathyco/x-components/history-queries'
import { defineComponent } from 'vue'
import HistoryQueryFilters from '../history-query-filters.vue'

export default defineComponent({
  components: {
    BaseIdModalClose,
    CrossTinyIcon,
    HistoryIcon,
    MyHistory,
    HistoryQuery,
    HistoryQueryFilters,
  },
  setup() {
    return {
      animation: StaggeredFadeAndSlide,
      x: use$x(),
    }
  },
})
</script>
