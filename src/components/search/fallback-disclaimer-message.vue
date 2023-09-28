<template>
  <FallbackDisclaimer class="x-fallback-message x-message">
    <i18n class="x-text1 desktop:x-text1-lg" path="fallbackDisclaimer.message" tag="p">
      <template #query>
        <span class="x-w-auto x-font-bold">"{{ $x.query.search }}"</span>
      </template>
    </i18n>
  </FallbackDisclaimer>
</template>

<script setup lang="ts">
  import { FallbackDisclaimer } from '@empathyco/x-components/search';
</script>
