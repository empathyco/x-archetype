<template>
  <i18n-t
    v-if="x.noResults"
    class="x-no-results-message xds:message xds:text1 xds:desktop:mt-24 xds:desktop:text1-lg"
    keypath="noResults.message"
    :class="{ 'xds:flex-col': isTabletOrLess }"
    tag="p"
  >
    <template #query>
      <span class="xds:w-auto xds:font-bold">"{{ x.query.search }}"</span>
      <div class="xds:basis-full"></div>
    </template>
  </i18n-t>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { useDevice } from '../../composables/use-device.composable'

const { isTabletOrLess } = useDevice()
const x = use$x()
</script>
