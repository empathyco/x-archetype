<template>
  <span
    v-if="$x.noResults"
    v-html="$t('noResults.message', { query: $x.query.search })"
    class="x-message x-text"
    :class="{ 'x-font-size--05': $x.device === 'desktop' }"
  />
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class NoResultsMessage extends Vue {}
</script>
