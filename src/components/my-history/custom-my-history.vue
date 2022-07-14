<template>
  <div>
    <div
      v-if="$x.device === 'desktop'"
      class="x-list x-background--neutral-10 x-list--align-center"
    >
      <MyHistoryIcon v-if="isMyHistoryEnabled" />
      <MyHistoryIconBw v-else />
    </div>
    <div class="x-list x-list__item--expand" :class="{ 'x-scroll': $x.device === 'desktop' }">
      <div
        v-if="$x.device === 'mobile'"
        class="x-list x-background--neutral-10"
        :class="$x.device === 'desktop' ? 'x-list--align-center' : 'x-list--align-end'"
      >
        <MyHistoryIcon
          v-if="isMyHistoryEnabled"
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
        <h2 class="x-title2 x-font-weight--bold x-font-color--neutral-10">
          {{ $t('myHistory.subtitle') }}
        </h2>
        <div
          v-html="$t('myHistory.message')"
          class="x-list x-list--gap-05 x-title3 x-font-color--neutral-35"
        ></div>
      </div>
      <div
        class="
          x-padding--top-06 x-padding--bottom-07
          x-list x-list--horizontal x-list--align-center
          x-border-color--neutral-95
          x-border-width--top-01
        "
        :class="$x.device === 'desktop' ? 'x-padding--07' : 'x-padding--05'"
      >
        <div class="x-list__item x-list__item--expand x-list x-list--gap-02">
          <span class="x-title3 x-font-weight--bold">HistoryQueries</span>
          <span class="x-font-color--neutral-35">Disable and clear</span>
        </div>
        <HistoryQueriesSwitch />
      </div>
      <div class="x-list x-list__item--expand x-border-color--neutral-95 x-border-width--top-01">
        <MyHistory v-if="isMyHistoryEnabled && $x.fullHistoryQueries.length" :animation="animation">
          <template #date="{ date }">
            <div
              class="
                x-padding--top-05 x-padding--bottom-05
                x-font-color--neutral-35
                x-font-weight--bold
              "
              :class="$x.device === 'desktop' ? 'x-padding--07' : 'x-padding--05'"
            >
              {{ date }}
            </div>
          </template>
          <template #suggestion-content="{ suggestion, formatTime }">
            <div
              class="
                x-list x-list--horizontal x-list--gap-05
                x-padding--bottom-04 x-padding--top-04
              "
            >
              <HistoryIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
              <div class="x-list x-list--gap-01">
                <span>{{ suggestion.query }}</span>
                <span class="x-small x-font-color--neutral-35">
                  {{ formatTime(suggestion.timestamp) }}
                </span>
              </div>
            </div>
          </template>
          <template #suggestion-remove-content>
            <CrossTinyIcon :class="{ 'x-icon--l': $x.device === 'mobile' }" />
          </template>
        </MyHistory>
        <div v-else class="x-list x-list--align-center x-list__item--expand">
          <NoHistoryIcon
            class="x-flex-no-shrink"
            :class="{ 'x-no-history-icon--bw': !isMyHistoryEnabled }"
          />
          <span
            class="
              x-title3
              x-padding--05
              x-font-weight--bold
              x-font-color--neutral-35
              x-list x-list--justify-center x-list__item--expand
            "
          >
            {{ $t('myHistory.noHistory') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { CrossTinyIcon, HistoryIcon, StaggeredFadeAndSlide } from '@empathyco/x-components';
  import { MyHistory, HistoryQueriesSwitch } from '@empathyco/x-components/history-queries';
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import MyHistoryIcon from './my-history-icon.vue';
  import MyHistoryIconBw from './my-history-icon-bw.vue';
  import NoHistoryIcon from './no-history-icon.vue';

  @Component({
    components: {
      CrossTinyIcon,
      HistoryIcon,
      MyHistory,
      MyHistoryIcon,
      MyHistoryIconBw,
      NoHistoryIcon,
      HistoryQueriesSwitch
    }
  })
  export default class CustomMyHistory extends Vue {
    protected animation = StaggeredFadeAndSlide;

    @Prop({ default: true })
    public isMyHistoryEnabled!: boolean;
  }
</script>

<style lang="scss" scoped>
  .x-my-history-icon,
  .x-my-history-icon-bw {
    width: 251px;
    height: 137px;
  }
  .x-no-history-icon {
    width: 100%;
    height: auto;

    &--bw {
      filter: grayscale(1);
    }
  }
  .x-scroll {
    overflow-y: auto;
  }
  .x-mobile {
    .x-my-history-icon,
    .x-my-history-icon-bw {
      width: 182px;
      height: 112px;
    }
  }
</style>
