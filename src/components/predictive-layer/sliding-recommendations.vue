<template>
  <div v-if="$x.recommendations.length > 0" class="x-list x-list--gap-04">
    <h1 class="x-title3 x-text--bold">{{ $t('recommendations.title') }}</h1>
    <CustomSlidingPanel :resetOnContentChange="false">
      <Recommendations>
        <template #default="{ recommendation }">
          <Result :result="recommendation" data-test="recommendation-item" />
        </template>
      </Recommendations>
    </CustomSlidingPanel>
  </div>
</template>
<script lang="ts">
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from '../results/result.vue';
  import CustomSlidingPanel from '../custom-sliding-panel.vue';

  @Component({
    components: {
      CustomSlidingPanel,
      Recommendations,
      Result
    }
  })
  export default class SlidingRecommendations extends Vue {}
</script>
