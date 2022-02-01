<template>
  <Spellcheck v-if="hasSearched && $x.totalResults > 0" #default="{ query }" class="x-message">
    <p>
      <span v-html="$t('spellcheck.message', { query })" class="x-text" />
      <SpellcheckButton v-if="hasSearched" class="x-button x-button--ghost x-padding--01" />
    </p>
  </Spellcheck>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search';
  import HasSearchedMixin from '../has-searched.mixin.vue';

  @Component({
    components: {
      Spellcheck,
      SpellcheckButton
    }
  })
  export default class SpellcheckMessage extends HasSearchedMixin {}
</script>
