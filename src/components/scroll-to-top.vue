<template>
  <ScrollToTop
    class="xds:layout-on-margin-right xds:button xds:button-circle xds:justify-self-end xds:button-lead xds:desktop:mr-16 xds:desktop:mb-16"
    :class="ui('scrollToTop')?.root"
    scroll-id="main-scroll"
    :threshold-px="100"
    :animation="animation"
  >
    <ChevronUpIcon class="xds:icon-lg xds:desktop:icon-md" />
  </ScrollToTop>
</template>

<script setup lang="ts">
import { ChevronUpIcon, Fade } from '@empathyco/x-components'
import { ScrollToTop } from '@empathyco/x-components/scroll'
import { useInstanceExtensions } from '../composables/use-instance-extensions.composable'

const animation = Fade

const { ui } = useInstanceExtensions()
</script>
