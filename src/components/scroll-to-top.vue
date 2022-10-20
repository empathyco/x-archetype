<template>
  <ScrollToTop class="x-button--round" scrollId="main-scroll" :thresholdPx="100">
    <ChevronUpIcon />
  </ScrollToTop>
</template>

<script lang="ts">
  import { ChevronUpIcon } from '@empathyco/x-components';
  import { ScrollToTop } from '@empathyco/x-components/scroll';
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component({
    components: {
      ScrollToTop,
      ChevronUpIcon
    }
  })
  export default class ScrollToTopComponent extends Vue {
    cleanMarkdown(input: string): string {
      return input.replace(/\r?\n/g, '<br />').replace(/\|/g, '\\|');
    }
  }
</script>
