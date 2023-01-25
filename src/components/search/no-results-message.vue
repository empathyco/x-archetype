<template>
  <i18n
    v-if="$x.noResults"
    class="x-no-results-message x-message x-text1 x-break-words desktop:x-text1-lg"
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
