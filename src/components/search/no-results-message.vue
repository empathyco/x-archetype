<template>
  <span
    v-if="$x.noResults"
    v-html="$t('noResults.message', { query: $x.query.search })"
    class="x-text1 x-no-results-message x-message"
    :class="{ 'x-text1-lg': $x.device === 'desktop' }"
  />
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

      span {
        word-wrap: break-word;
      }
    }
  }
</style>
