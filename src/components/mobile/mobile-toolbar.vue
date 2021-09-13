<template>
  <div class="x-list x-list--padding-03">
    <span v-if="$x.totalResults">
      {{ $t('totalResults.message', { totalResults: $x.totalResults }) }}
    </span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class MobileToolbar extends Vue {}
</script>
