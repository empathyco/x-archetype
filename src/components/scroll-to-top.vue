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
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      ScrollToTop,
      ChevronUpIcon
    },
    setup() {
      const animation = Fade;

      return {
        animation
      };
    }
  });
</script>
