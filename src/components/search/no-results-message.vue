<template>
  <i18n
    v-if="$x.noResults"
    class="x-no-results-message x-text1 x-flex x-flex-col x-items-center x-gap-8 x-break-words x-bg-neutral-10 x-p-24 x-text-center desktop:x-text1-lg"
    path="noResults.message"
  >
    <template #query>
      <span class="x-font-bold">
        {{ $x.query.search }}
      </span>
    </template>
  </i18n>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class NoResultsMessage extends Vue {}
</script>

<style lang="scss">
  .x-no-results-message {
    > span {
      width: 100%;
    }
  }
</style>
