<template>
  <div class="x-list x-list--gap-04" :class="{ 'x-padding--top-05': $x.device === 'desktop' }">
    <h1
      class="x-small x-text--bold x-uppercase"
      :class="{ 'x-padding--left-05': $x.device === 'mobile' }"
    >
      <slot name="title" />
    </h1>
    <SlidingPanel
      class="x-sliding-panel--show-buttons-on-hover"
      :showButtons="true"
      :buttonClass="'x-button--ghost x-padding--00'"
      :resetOnContentChange="false"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon--l" />
      </template>

      <slot />

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

  @Component({
    components: {
      ChevronLeftIcon,
      ChevronRightIcon,
      Recommendations,
      SlidingPanel
    }
  })
  export default class Custom extends Vue {}
</script>
<style scoped lang="scss">
  ::v-deep .x-sliding-panel__scroll {
    pointer-events: all !important;
  }
</style>
