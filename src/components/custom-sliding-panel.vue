<template>
  <SlidingPanel
    :showButtons="$x.device !== 'mobile'"
    :resetOnContentChange="false"
    buttonClass="x-button-lead x-button-circle x-button-ghost x-padding--00"
    scrollContainerClass="desktop:x-sliding-panel-fade desktop:x-sliding-panel-fade-sm"
    class="x-sliding-panel-show-buttons-on-hover"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="x-icon-lg" />
    </template>
    <template #sliding-panel-right-button>
      <ChevronRightIcon class="x-icon-lg" />
    </template>
    <ul class="x-list x-list--horizontal x-list--gap-05">
      <slot />
    </ul>
  </SlidingPanel>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import Vue from 'vue';
  import { SlidingPanel, ChevronLeftIcon, ChevronRightIcon } from '@empathyco/x-components';

  @Component({
    components: {
      SlidingPanel,
      ChevronLeftIcon,
      ChevronRightIcon
    }
  })
  export default class CustomSlidingPanel extends Vue {}
</script>
