<template>
  <div class="x-flex-1">
    <BaseIdModalClose modalId="my-history-aside" #closing-element="{ closeModal }">
      <MyHistory
        v-if="isHistoryQueriesEnabled && fullHistoryQueries.length"
        :animation="animation"
        class="x-px-16 x-pb-32 desktop:x-pl-32"
        queriesListClass="x-gap-16"
      >
        <template #date="{ date }">
          <div class="x-title4 x-title4-sm x-py-16 x-text-neutral-75">{{ date }}</div>
        </template>

        <template #suggestion="{ suggestion, formatTime }">
          <HistoryQuery
            @click="closeModal"
            data-test="my-history-query"
            :suggestion="suggestion"
            suggestionClass="x-suggestion"
            class="hover:x-no-underline"
          >
            <HistoryIcon class="max-desktop:x-icon-lg" />

            <div class="x-group x-flex x-flex-col x-gap-2">
              <p class="group-hover:x-underline">{{ suggestion.query }}</p>

              <HistoryQueryFilters
                :showLength="true"
                class="x-w-224 desktop:x-w-320"
                :filtersList="suggestion.selectedFilters"
              />

              <p class="x-text1 x-text1-sm x-text-neutral-75">
                {{ formatTime(suggestion.timestamp) }}
                <template v-if="suggestion.totalResults !== undefined">
                  -
                  {{ $t('myHistory.suggestionResults', { totalResults: suggestion.totalResults }) }}
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
    </BaseIdModalClose>
  </div>
</template>

<script lang="ts">
  import {
    BaseIdModalClose,
    CrossTinyIcon,
    HistoryIcon,
    StaggeredFadeAndSlide,
    useState
  } from '@empathyco/x-components';
  import { MyHistory, HistoryQuery } from '@empathyco/x-components/history-queries';
  import { defineComponent } from 'vue';
  import HistoryQueryFilters from '../history-query-filters.vue';

  export default defineComponent({
    components: {
      BaseIdModalClose,
      CrossTinyIcon,
      HistoryIcon,
      MyHistory,
      HistoryQuery,
      HistoryQueryFilters
    },
    setup() {
      const { isEnabled: isHistoryQueriesEnabled, historyQueries: fullHistoryQueries } = useState(
        'historyQueries',
        ['isEnabled', 'historyQueries']
      );
      return {
        animation: StaggeredFadeAndSlide,
        isHistoryQueriesEnabled,
        fullHistoryQueries
      };
    }
  });
</script>
