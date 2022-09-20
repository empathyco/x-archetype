<template>
  <QueryPreview :query="$x.query.searchBox" #default="{ results }">
    <PredictiveSliding
      v-if="$x.recommendations.length > 0"
      class="x-row__item"
      :class="
        $x.device === 'mobile' ? 'x-row__item--span-12' : 'x-row__item--start-6 x-row__item--span-7'
      "
    >
      <template #title>Query Preview</template>
      <template #default>
        <ul
          class="x-list x-list--horizontal x-list--gap-04"
          :class="{ 'x-padding--left-05': $x.device === 'mobile' }"
        >
          <li v-for="result in results" :key="result.id" class="x-predictive-query-preview__item">
            <Result
              :result="result"
              data-test="query-preview-item"
              :showDescription="false"
              :showAddToCart="false"
            />
          </li>
        </ul>
      </template>
    </PredictiveSliding>
  </QueryPreview>
</template>
<script lang="ts">
  import { SlidingPanel, ChevronLeftIcon, ChevronRightIcon } from '@empathyco/x-components';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import { QueryPreview } from '@empathyco/x-components/queries-preview';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from '../results/result.vue';
  import PredictiveSliding from './predictive-sliding.vue';

  @Component({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      PredictiveSliding,
      Recommendations,
      QueryPreview,
      Result,
      SlidingPanel
    }
  })
  export default class PredictiveQueryPreview extends Vue {}
</script>
