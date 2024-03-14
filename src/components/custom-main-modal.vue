<template>
  <MainModal
    :animation="animation"
    :class="`x-${deviceName}`"
    :focusOnOpen="isTabletOrLess && focusOnOpen"
  >
    <Mobile v-if="isTabletOrLess" />
    <Desktop v-else />
  </MainModal>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { animateClipPath, MainModal, SnippetConfig } from '@empathyco/x-components';
  import { useDevice } from '../composables/use-device.composable';
  import Mobile from './mobile/mobile.vue';
  import Desktop from './desktop/desktop.vue';

  export default defineComponent({
    components: {
      MainModal,
      Mobile,
      Desktop
    },
    setup() {
      const { isTabletOrLess, deviceName } = useDevice();
      const snippetConfig = <SnippetConfig>inject('snippetConfig');

      /**
       * Sets focusOnOpen to false if there are no query previews
       * to avoid having to click the input manually to be able to write.
       */
      const focusOnOpen = !!snippetConfig.queriesPreview && snippetConfig.queriesPreview.length > 0;

      return {
        animation: animateClipPath(),
        deviceName,
        isTabletOrLess,
        focusOnOpen
      };
    }
  });
</script>
