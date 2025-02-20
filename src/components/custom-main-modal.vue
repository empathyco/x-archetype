<template>
  <MainModal
    :animation="animation"
    :class="`x-${deviceName}`"
    :content-class="contentClass"
    :focus-on-open="isTabletOrLess"
  >
    <Mobile v-if="isTabletOrLess" />
    <Desktop v-else />
  </MainModal>
</template>

<script lang="ts">
import { animateClipPath, MainModal, use$x } from '@empathyco/x-components'
import { computed, defineComponent } from 'vue'
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
    const { deviceName, isDesktopOrGreater, isTabletOrLess } = useDevice()
    const animation = animateClipPath()
    const x = use$x()

    const overflowClass = computed(() =>
      !isDesktopOrGreater.value && x.query.searchBox ? 'x-overflow-clip x-touch-none' : '',
    )

    const contentClass = computed(() => `${overflowClass.value}`)

    return {
      animation,
      contentClass,
      deviceName,
      isTabletOrLess,
    }
  },
})
</script>
