<template>
  <MainModal :animation="animation" :class="`x-${deviceName}`" :focusOnOpen="isTabletOrLess">
    <Mobile v-if="isTabletOrLess" />
    <Desktop v-else />
  </MainModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { animateClipPath, MainModal } from '@empathyco/x-components';
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
      return {
        animation: animateClipPath(),
        deviceName,
        isTabletOrLess
      };
    }
  });
</script>
