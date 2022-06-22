<template>
  <div
    v-if="!$x.query.searchBox && $x.recommendations.length > 0"
    class="x-list x-list--padding-07 x-list--gap-07 x-list--padding-bottom"
  >
    <h1 class="x-title3 x-text--bold">{{ $t('recommendations.title') }}</h1>
    <SlidingPanel
      class="x-sliding-panel--show-buttons-on-hover"
      :showButtons="true"
      :buttonClass="'x-button--ghost x-padding--00'"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon--l" />
      </template>

      <Recommendations v-if="!$x.totalResults">
        <template #default="{ recommendation }">
          <Result :result="recommendation" data-test="recommendation-item" />
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
  export default class CustomRecommendations extends Vue {}
</script>
