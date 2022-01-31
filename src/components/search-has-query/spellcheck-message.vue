<template>
  <Spellcheck v-if="hasQuery && $x.totalResults > 0" #default="{ query }" class="x-message">
    <p>
      <span v-html="$t('spellcheck.message', { query })" class="x-text" />
      <SpellcheckButton v-if="hasQuery" class="x-button x-button--ghost x-padding--01" />
    </p>
  </Spellcheck>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search';
  import HasQueryMixin from '../has-query.mixin.vue';

  @Component({
    components: {
      Spellcheck,
      SpellcheckButton
    }
  })
  export default class SpellcheckMessage extends HasQueryMixin {}
</script>
