<template>
  <FallbackDisclaimer v-if="x.fromNoResultsWithFilters" class="x-fallback-message xds:message">
    <Translation
      class="xds:text1 xds:desktop:text1-lg"
      keypath="fallbackDisclaimer.message"
      tag="p"
      scope="global"
    >
      <template #query>
        <span class="xds:w-auto xds:font-bold">"{{ x.query.search }}"</span>
      </template>
    </Translation>
  </FallbackDisclaimer>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { FallbackDisclaimer } from '@empathyco/x-components/search'
import { Translation } from 'vue-i18n'

const x = use$x()
</script>
