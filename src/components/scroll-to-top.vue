<template>
  <ScrollToTop
    class="x-button-lead x-button-circle x-layout-on-margin-right x-justify-self-end desktop:x-mb-16 desktop:x-mr-16"
    scrollId="main-scroll"
    :thresholdPx="100"
    :animation="animation"
  >
    <ChevronUpIcon class="x-icon-lg desktop:x-icon-md" />
  </ScrollToTop>
</template>

<script lang="ts">
  import { ChevronUpIcon, Fade } from '@empathyco/x-components';
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
    private animation = Fade;
  }
</script>
