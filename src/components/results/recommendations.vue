<template>
  <div
    v-if="!$x.query.searchBox && $x.recommendations.length > 0"
    class="x-list x-list--align-center x-list--padding-07 x-list--gap-07 x-list--padding-bottom"
  >
    <h1 class="x-title1 x-text--bold">{{ $t('recommendations.title') }}</h1>
    <SlidingPanel
      class="x-sliding-panel--buttons-overflow x-sliding-panel--show-buttons-on-hover"
      :showButtons="$x.device !== 'mobile'"
    >
      <Recommendations v-if="!$x.totalResults">
        <template #default="{ recommendation }">
          <Result :result="recommendation" data-test="recommendation-item" />
        </template>
      </Recommendations>
    </SlidingPanel>
  </div>
</template>

<script lang="ts">
  import { BaseGrid, SlidingPanel } from '@empathyco/x-components';
  import { Recommendations } from '@empathyco/x-components/recommendations';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Result from './result.vue';

  @Component({
    components: {
      BaseGrid,
      Recommendations,
      Result,
      SlidingPanel
    }
  })
  export default class Results extends Vue {}
</script>
