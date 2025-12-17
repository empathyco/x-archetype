<template>
  <MainModal
    :animation="animation"
    :class="`x-${deviceName}`"
    :content-class="contentClass"
    :focus-on-open="isTabletOrLess"
    :reference-selector="referenceSelector"
  >
    <Mobile v-if="isTabletOrLess" />
    <Desktop v-else />
  </MainModal>
  <VariantSelector />
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import { animateClipPath, MainModal, use$x } from '@empathyco/x-components'
import { computed, inject } from 'vue'
import { useDevice } from '../composables/use-device.composable'
import VariantSelector from './add2cart/variant-selector.vue'
import Desktop from './desktop/desktop.vue'
import Mobile from './mobile/mobile.vue'

const { deviceName, isDesktopOrGreater, isTabletOrLess } = useDevice()
const animation = animateClipPath()
const x = use$x()
const snippetConfig = inject<SnippetConfig>('snippetConfig')

const referenceSelector = computed(() => {
  return snippetConfig?.layerSelector ?? undefined
})

const contentClass = computed(() =>
  !isDesktopOrGreater.value && x.query.searchBox ? '!x-overflow-clip x-touch-none' : '',
)
</script>
