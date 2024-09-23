<template>
  <i18n-t
    v-if="noResults"
    class="x-no-results-message x-text1 x-message desktop:x-text1-lg desktop:x-mt-24"
    keypath="noResults.message"
    :class="{ 'x-flex-col': isTabletOrLess }"
    tag="p"
  >
    <template #query>
      <span class="x-w-auto x-font-bold">"{{ query.search }}"</span>
      <div class="x-basis-full"></div>
    </template>
  </i18n-t>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useAliasApi, useState } from '@empathyco/x-components';
  import { useDevice } from '../../composables/use-device.composable';

  export default defineComponent({
    setup() {
      const { isTabletOrLess } = useDevice();
      const { isNoResults: noResults } = useState('search', ['isNoResults']);
      const { query } = useAliasApi();

      return {
        isTabletOrLess,
        noResults,
        query
      };
    }
  });
</script>
