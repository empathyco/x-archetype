<template>
  <div>
    <div
      v-if="$x.device === 'desktop'"
      class="x-list x-background--neutral-10 x-list--align-center"
    >
      <MyHistoryIcon v-if="areHistoryQueriesEnabled" />
      <MyHistoryIconBw v-else />
    </div>
    <div class="x-list x-list__item--expand" :class="{ 'x-scroll': $x.device === 'desktop' }">
      <div
        v-if="$x.device === 'mobile'"
        class="x-list x-background--neutral-10"
        :class="$x.device === 'desktop' ? 'x-list--align-center' : 'x-list--align-end'"
      >
        <MyHistoryIcon
          v-if="areHistoryQueriesEnabled"
          :class="{ 'x-margin--right-05': $x.device === 'mobile' }"
        />
        <MyHistoryIconBw v-else :class="{ 'x-margin--right-05': $x.device === 'mobile' }" />
      </div>
      <div
        class="x-padding--top-06 x-padding--bottom-07 x-list x-list--gap-06"
        :class="
          $x.device === 'desktop' ? 'x-padding--left-07 x-padding--right-05' : 'x-padding--05'
        "
      >
        <h2 class="x-title3">
          {{ $t('myHistory.subtitle') }}
        </h2>

        <div class="x-list x-list--gap-05 x-text1 x-text1-lg x-text-neutral-75">
          <span>
            {{ $t('myHistory.message.header') }}
          </span>
          <span>
            {{ $t('myHistory.message.body') }}
          </span>
          <span class="x-title3">
            {{ $t('myHistory.message.footer') }}
          </span>
        </div>
      </div>
      <div
        class="x-padding--top-06 x-padding--bottom-07 x-list x-list--horizontal x-list--align-center x-border-color--neutral-95 x-border-width--top-01"
        :class="$x.device === 'desktop' ? 'x-padding--07' : 'x-padding--05'"
      >
        <div class="x-list__item x-list__item--expand x-list x-list--gap-02">
          <span class="x-title3">{{ $t('myHistory.switch.title') }}</span>
          <span class="x-text1 x-text1-lg x-text-neutral-75">
            {{
              areHistoryQueriesEnabled
                ? $t('myHistory.switch.disable')
                : $t('myHistory.switch.enable')
            }}
          </span>
        </div>
        <HistoryQueriesSwitch />
      </div>
      <div
        class="x-list x-list__item--expand x-border-color--neutral-95 x-border-width--top-01"
        :class="$x.device === 'desktop' ? 'x-pl-32 x-pr-32' : 'x-pl-16 x-pr-16'"
      >
        <MyHistory
          v-if="areHistoryQueriesEnabled && $x.fullHistoryQueries.length"
          :animation="animation"
        >
          <template #date="{ date }">
            <div
              class="x-padding--top-05 x-padding--bottom-05 x-title4 x-title4-sm x-text-neutral-75"
            >
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
                >
                  <div
                    class="x-list x-list--horizontal x-list--gap-05 x-padding--bottom-02 x-padding--top-02"
                  >
                    <HistoryIcon :class="{ 'x-icon-lg': $x.device === 'mobile' }" />
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
                    <CrossTinyIcon :class="{ 'x-icon-lg': $x.device === 'mobile' }" />
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
