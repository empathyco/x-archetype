<template>
  <PredictiveSliding v-if="$x.recommendations.length > 0">
    <template #title>
      {{ $t('recommendations.title') }}
    </template>
    <template #default>
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
    </template>
  </PredictiveSliding>
</template>
<script lang="ts">
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from '../results/result.vue';
  import PredictiveSliding from './predictive-sliding.vue';

  @Component({
    components: {
      PredictiveSliding,
      Recommendations,
      Result
    }
  })
  export default class PredictiveRecommendations extends Vue {}
</script>
