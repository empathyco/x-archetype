<template>
  <i18n
    v-if="$x.noResults"
    class="x-no-results-message x-text1 x-message desktop:x-text1-lg desktop:x-mt-24"
    path="noResults.message"
    :class="{ 'x-flex-col': isTabletOrLess }"
    tag="p"
  >
    <template #query>
      <span class="x-w-auto x-font-bold">"{{ $x.query.search }}"</span>
      <div class="x-basis-full"></div>
    </template>
  </i18n>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDevice } from '../../composables/use-device.composable';

  export default defineComponent({
    setup() {
      const { isTabletOrLess } = useDevice();

      return {
        isTabletOrLess
      };
    }
  });
</script>
