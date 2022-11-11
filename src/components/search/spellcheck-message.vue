<template>
  <Spellcheck v-if="$x.totalResults > 0" #default="{ query }" class="x-message">
    <p>
      <span v-html="$t('spellcheck.message', { query })" class="x-text" />
      <SpellcheckButton class="x-button x-button-lead x-button-ghost x-padding--01" />
    </p>
  </Spellcheck>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search';

  @Component({
    components: {
      Spellcheck,
      SpellcheckButton
    }
  })
  export default class SpellcheckMessage extends Vue {}
</script>
