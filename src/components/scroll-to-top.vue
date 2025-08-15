<template>
  <ScrollToTop
    class="x-button-lead x-button-circle x-layout-on-margin-right x-justify-self-end desktop:x-mb-16 desktop:x-mr-16"
    scroll-id="main-scroll"
    :threshold-px="100"
    :animation="animation"
  >
    <ChevronUpIcon class="x-icon-lg desktop:x-icon-md" />
  </ScrollToTop>
</template>

<script setup lang="ts">
import { ChevronUpIcon, Fade } from '@empathyco/x-components'
import { ScrollToTop } from '@empathyco/x-components/scroll'

const animation = Fade
</script>
