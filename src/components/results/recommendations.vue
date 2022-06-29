<template>
  <div
    v-if="$x.recommendations.length > 0"
    class="x-list x-list--align-center x-list--padding-07 x-list--padding-bottom"
    :class="{ 'x-list--align-start': $x.device === 'mobile' }"
  >
    <h1 class="x-title1" :class="{ 'x-padding--left-05': $x.device === 'mobile' }">
      {{ $t('recommendations.title') }}
    </h1>
    <Recommendations v-if="!$x.totalResults">
      <template #layout="{ recommendations }">
        <BaseGrid
          #default="{ item: result }"
          :animation="staggeredFadeAndSlide"
          :columns="$x.device === 'mobile' ? 2 : 4"
          :items="recommendations"
        >
          <Result :result="result" data-test="recommendation-item" />
        </BaseGrid>
      </template>
    </Recommendations>
  </div>
</template>

<script lang="ts">
  import { BaseGrid, StaggeredFadeAndSlide } from '@empathyco/x-components';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from './result.vue';

  @Component({
    components: {
      BaseGrid,
      Recommendations,
      Result
    }
  })
  export default class Results extends Vue {
    protected staggeredFadeAndSlide = StaggeredFadeAndSlide;
  }
</script>
