<template>
  <Translation
    v-if="x.noResults"
    class="x-no-results-message xds:message xds:bg-lead-light xds:text-md xds:desktop:mt-24"
    keypath="noResults.message"
    :class="{ 'xds:flex-col': isTabletOrLess }"
    tag="p"
  >
    <template #query>
      <span class="xds:w-auto xds:font-bold">"{{ x.query.search }}"</span>
      <div class="xds:basis-full"></div>
    </template>
  </Translation>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { Translation } from 'vue-i18n'
import { useDevice } from '../../composables/use-device.composable'
const { isTabletOrLess } = useDevice()
const x = use$x()
</script>
