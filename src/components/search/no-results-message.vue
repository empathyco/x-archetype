<template>
  <i18n
    v-if="$x.noResults"
    class="x-no-results-message x-text1 x-mt-24 x-flex x-items-center x-break-words x-bg-neutral-10 x-py-8 x-text-center desktop:x-flex-wrap desktop:x-justify-center desktop:x-gap-8 desktop:x-text1-lg desktop:x-py-24"
    path="noResults.message"
    :class="{ 'x-flex-col': isTabletOrLess }"
  >
    <template #query>
      <span class="x-w-auto x-font-bold">"{{ $x.query.search }}"</span>
      <div class="x-basis-full"></div>
    </template>
  </i18n>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { useDevice } from '../../composables/use-device.composable';

  @Component
  export default class NoResultsMessage extends Vue {
    protected get isTabletOrLess(): boolean {
      return useDevice().isTabletOrLess.value;
    }
  }
</script>

<style lang="scss">
  .x-no-results-message {
    > span {
      width: 100%;
    }
  }
</style>
