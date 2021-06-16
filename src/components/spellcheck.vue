<template>
  <Spellcheck
    #default="{ query }"
    class="x-message x-list x-list--wrap x-list--justify-center x-list--align-center"
  >
    <span v-html="$t('spellcheck.message', { query })" class="x-text" />
    <SpellcheckButton class="x-button x-button--ghost" />
  </Spellcheck>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Spellcheck, SpellcheckButton } from '@empathy/x-components/search';

  @Component({
    components: {
      Spellcheck,
      SpellcheckButton
    }
  })
  export default class SpellcheckComponent extends Vue {}
</script>
