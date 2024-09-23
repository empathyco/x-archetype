<template>
  <FallbackDisclaimer v-if="fromNoResultsWithFilters" class="x-fallback-message x-message">
    <i18n-t class="x-text1 desktop:x-text1-lg" keypath="fallbackDisclaimer.message" tag="p">
      <template #query>
        <span class="x-w-auto x-font-bold">"{{ query.search }}"</span>
      </template>
    </i18n-t>
  </FallbackDisclaimer>
</template>

<script setup lang="ts">
  import { useAliasApi, useState } from '@empathyco/x-components';
  import { FallbackDisclaimer } from '@empathyco/x-components/search';
  const { query } = useAliasApi();
  const { fromNoResultsWithFilters } = useState('search', ['fromNoResultsWithFilters']);
</script>
