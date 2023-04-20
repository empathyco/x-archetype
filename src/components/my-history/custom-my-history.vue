<template>
  <div class="x-flex-1">
    <BaseIdModalClose modalId="my-history-aside" #closing-element="{ closeModal }">
      <MyHistory
        v-if="$x.isHistoryQueriesEnabled && $x.fullHistoryQueries.length"
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
          >
            <HistoryIcon class="max-desktop:x-icon-lg" />

            <div class="x-flex x-flex-col x-gap-2">
              <p>{{ suggestion.query }}</p>
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

      <div v-else class="x-flex x-flex-1 x-flex-col x-items-center">
        <NoHistoryIcon
          class="x-flex-no-shrink"
          :class="{ 'x-grayscale': !$x.isHistoryQueriesEnabled }"
        />
        <p class="x-title3 x-py-16 x-text-neutral-75">
          {{ $t('myHistory.noHistory') }}
        </p>
      </div>
    </BaseIdModalClose>
  </div>
</template>

<script lang="ts">
  import {
    BaseIdModalClose,
    CrossTinyIcon,
    HistoryIcon,
    StaggeredFadeAndSlide
  } from '@empathyco/x-components';
  import { MyHistory, HistoryQuery } from '@empathyco/x-components/history-queries';
  import { defineComponent } from 'vue';
  import NoHistoryIcon from './no-history-icon.vue';

  export default defineComponent({
    components: {
      BaseIdModalClose,
      CrossTinyIcon,
      HistoryIcon,
      MyHistory,
      NoHistoryIcon,
      HistoryQuery
    },
    setup() {
      return {
        animation: StaggeredFadeAndSlide
      };
    }
  });
</script>
