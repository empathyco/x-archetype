<template>
  <MainModal :animation="animation" :class="`x-${deviceName}`" :focus-on-open="isTabletOrLess">
    <Mobile v-if="isTabletOrLess" />
    <Desktop v-else />
  </MainModal>
</template>

<script lang="ts">
import { animateClipPath, MainModal } from '@empathyco/x-components'
import { defineComponent } from 'vue'
import { useDevice } from '../composables/use-device.composable'
import Desktop from './desktop/desktop.vue'
import Mobile from './mobile/mobile.vue'

export default defineComponent({
  components: {
    MainModal,
    Mobile,
    Desktop,
  },
  setup() {
    const { isTabletOrLess, deviceName } = useDevice()
    return {
      animation: animateClipPath(),
      deviceName,
      isTabletOrLess,
    }
  },
})
</script>
