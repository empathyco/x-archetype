<template>
  <div
    v-if="!$x.totalResults && $x.query.search && $x.status.search !== 'loading'"
    class="x-no-results x-message x-list x-list--wrap x-list--align-center x-list--justify-center"
  >
    <span v-html="$t('noResults.message', { query: $x.query.search })" class="x-text" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class NoResultsMessage extends Vue {}
</script>
