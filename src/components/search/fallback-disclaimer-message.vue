<template>
  <FallbackDisclaimer v-if="x.fromNoResultsWithFilters" class="x-fallback-message x-message">
    <i18n-t
      class="x-text1 desktop:x-text1-lg"
      keypath="fallbackDisclaimer.message"
      tag="p"
      scope="global"
    >
      <template #query>
        <span class="x-w-auto x-font-bold">"{{ x.query.search }}"</span>
      </template>
    </i18n-t>
  </FallbackDisclaimer>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { FallbackDisclaimer } from '@empathyco/x-components/search'
const x = use$x()
</script>
