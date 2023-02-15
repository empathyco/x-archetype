<template>
  <div>
    <component
      :is="enableQueryButton ? queryComponent : 'div'"
      v-bind="$attrs"
      :class="enableQueryButton ? 'x-button x-button-tight x-font-bold' : 'x-font-bold'"
    >
      <slot name="header" />
      <ArrowRightIcon v-if="enableQueryButton" class="x-icon-lg" />
    </component>
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
        <slot>
          <Result v-for="item in results" :key="item.id" :result="item" :class="resultClass" />
        </slot>
      </ul>
    </SlidingPanel>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import Vue from 'vue';
  import {
    SlidingPanel,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowRightIcon
  } from '@empathyco/x-components';
  import { Result as ResultModel } from '@empathyco/x-types';
  import Result from './results/result.vue';

  @Component({
    components: {
      SlidingPanel,
      ChevronLeftIcon,
      ChevronRightIcon,
      ArrowRightIcon,
      Result
    },
    inheritAttrs: false
  })
  export default class CustomSlidingPanel extends Vue {
    @Prop({
      default: 'div'
    })
    public queryComponent!: Vue;

    @Prop()
    public results!: ResultModel[];

    @Prop()
    public resultClass!: string;

    @Prop()
    public totalResults!: number;

    public get enableQueryButton(): boolean {
      return this.totalResults > this.results.length;
    }
  }
</script>
