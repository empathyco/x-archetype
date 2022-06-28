<template>
  <div v-if="$x.recommendations.length > 0" class="x-list x-list--gap-04">
    <h1 class="x-small x-text--bold x-text--secondary">{{ $t('recommendations.title') }}</h1>
    <SlidingPanel
      class="x-sliding-panel--show-buttons-on-hover"
      :showButtons="true"
      :buttonClass="'x-button--ghost x-padding--00'"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon--l" />
      </template>

      <Recommendations class="x-list--horizontal x-list--gap-04">
        <template #default="{ recommendation }">
          <Result
            :result="recommendation"
            data-test="recommendation-item"
            :show-description="false"
          />
        </template>
      </Recommendations>

      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon--l" />
      </template>
    </SlidingPanel>
  </div>
</template>
<script lang="ts">
  import { SlidingPanel, ChevronLeftIcon, ChevronRightIcon } from '@empathyco/x-components';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from '../results/result.vue';

  @Component({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      Recommendations,
      Result,
      SlidingPanel
    }
  })
  export default class SlidingRecommendations extends Vue {}
</script>
<style lang="scss">
  .x-layout__predictive .x-sliding-panel__scroll {
    pointer-events: all !important;
  }
</style>
