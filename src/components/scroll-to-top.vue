<template>
  <BaseScrollToTop class="x-button--round" scrollId="main-scroll" :thresholdPx="100">
    <ChevronUpIcon />
  </BaseScrollToTop>
</template>

<script lang="ts">
  import { BaseScrollToTop, ChevronUpIcon } from '@empathyco/x-components';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      BaseScrollToTop,
      ChevronUpIcon
    }
  })
  export default class ScrollToTop extends Vue {}
</script>
