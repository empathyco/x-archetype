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
  import HasQueryMixin from './has-query.mixin.vue';

  @Component({
    components: {
      Spellcheck: () => import('./search-has-query.components').then(m => m.Spellcheck),
      SpellcheckButton: () => import('./search-has-query.components').then(m => m.SpellcheckButton)
    }
  })
  export default class SpellcheckMessage extends HasQueryMixin {}
</script>
