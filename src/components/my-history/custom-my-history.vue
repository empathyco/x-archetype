<template>
  <div>
    <MyHistory
      v-if="areHistoryQueriesEnabled && $x.fullHistoryQueries.length"
      :animation="animation"
    >
      <template #date="{ date }">
        <div class="x-padding--top-05 x-padding--bottom-05 x-title4 x-title4-sm x-text-neutral-75">
          {{ date }}
        </div>
      </template>
      <template #suggestion="{ suggestion, formatTime }">
        <BaseIdModalClose modalId="my-history-aside">
          <template #closing-element="{ closeModal }">
            <HistoryQuery
              @click="closeModal"
              data-test="my-history-query"
              :suggestion="suggestion"
              suggestionClass="x-suggestion"
            >
              <div
                class="x-list x-list--horizontal x-list--gap-05 x-padding--bottom-02 x-padding--top-02"
              >
                <HistoryIcon class="max-desktop:x-icon-lg" />
                <div class="x-list x-list--gap-01">
                  <span>{{ suggestion.query }}</span>
                  <span class="x-text1 x-text1-sm x-text-neutral-75">
                    {{ formatTime(suggestion.timestamp) }}
                    <template v-if="suggestion.totalResults !== undefined">
                      -
                      {{
                        $t('myHistory.suggestionResults', {
                          totalResults: suggestion.totalResults
                        })
                      }}
                    </template>
                  </span>
                </div>
              </div>

              <template #remove-button-content>
                <CrossTinyIcon class="x-icon-lg" />
              </template>
            </HistoryQuery>
          </template>
        </BaseIdModalClose>
      </template>
    </MyHistory>

    <div v-else class="x-list x-list--align-center x-list__item--expand">
      <NoHistoryIcon
        class="x-flex-no-shrink"
        :class="{ 'x-icon-no-history-bw': !areHistoryQueriesEnabled }"
      />
      <span
        class="x-padding--05 x-list x-list--justify-center x-list__item--expand x-title3 x-text-neutral-75"
      >
        {{ $t('myHistory.noHistory') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    BaseIdModalClose,
    CrossTinyIcon,
    HistoryIcon,
    StaggeredFadeAndSlide,
    State
  } from '@empathyco/x-components';
  import {
    MyHistory,
    HistoryQueriesSwitch,
    HistoryQuery
  } from '@empathyco/x-components/history-queries';
  import { Component, Vue } from 'vue-property-decorator';
  import MyHistoryIcon from './my-history-icon.vue';
  import MyHistoryIconBw from './my-history-icon-bw.vue';
  import NoHistoryIcon from './no-history-icon.vue';

  @Component({
    components: {
      BaseIdModalClose,
      CrossTinyIcon,
      HistoryIcon,
      MyHistory,
      MyHistoryIcon,
      MyHistoryIconBw,
      NoHistoryIcon,
      HistoryQueriesSwitch,
      HistoryQuery
    }
  })
  export default class CustomMyHistory extends Vue {
    protected animation = StaggeredFadeAndSlide;

    @State('historyQueries', 'isEnabled')
    public areHistoryQueriesEnabled!: boolean;
  }
</script>

<style lang="scss" scoped>
  .x-icon-my-history,
  .x-icon-my-history-bw {
    width: 251px;
    height: 137px;
  }
  .x-icon-no-history {
    width: 100%;
    height: auto;

    &-bw {
      filter: grayscale(1);
    }
  }
  .x-scroll {
    overflow-y: auto;
  }
  .x-mobile {
    .x-icon-my-history,
    .x-icon-my-history-bw {
      width: 182px;
      height: 112px;
    }
  }
</style>
