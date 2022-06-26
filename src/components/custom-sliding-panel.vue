<template>
  <SlidingPanel
    v-on="$listeners"
    v-bind="$attrs"
    class="x-sliding-panel--show-buttons-on-hover"
    :buttonClass="buttonClass"
    :showButtons="$x.device !== 'mobile'"
  >
    <template #sliding-panel-left-button>
      <slot name="sliding-panel-left-button">
        <ChevronLeftIcon class="x-icon--l" />
      </slot>
    </template>
    <template #sliding-panel-right-button>
      <slot name="sliding-panel-right-button">
        <ChevronRightIcon class="x-icon--l" />
      </slot>
    </template>
    <slot />
  </SlidingPanel>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { SlidingPanel, ChevronLeftIcon, ChevronRightIcon } from '@empathyco/x-components';

  @Component({
    components: {
      SlidingPanel,
      ChevronLeftIcon,
      ChevronRightIcon
    }
  })
  export default class CustomSlidingPanel extends Vue {
    @Prop({
      default: 'x-button--ghost x-padding--00'
    })
    private buttonClass!: string;
  }
</script>
