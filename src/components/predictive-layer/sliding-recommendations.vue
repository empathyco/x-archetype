<template>
  <div v-if="$x.recommendations.length > 0" class="x-list x-list--gap-04">
    <h1
      class="x-uppercase x-title4 x-title4-sm x-flex x-h-32 x-items-center x-pt-16 x-pl-24 desktop:x-pl-0 desktop:x-pt-0"
    >
      {{ $t('recommendations.title') }}
    </h1>
    <SlidingPanel
      class="x-sliding-panel-show-buttons-on-hover"
      :showButtons="true"
      buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
      scrollContainerClass="desktop:x-sliding-panel-fade"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-lg" />
      </template>

      <Recommendations
        class="x-list--horizontal x-list--gap-04"
        :class="{ 'x-padding--left-05': $x.device === 'mobile' }"
      >
        <template #default="{ recommendation }">
          <Result
            :result="recommendation"
            data-test="recommendation-item"
            :showDescription="false"
            :showAddToCart="false"
          />
        </template>
      </Recommendations>

      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon-lg" />
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
