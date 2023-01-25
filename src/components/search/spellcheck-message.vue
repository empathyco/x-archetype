<template>
  <Spellcheck v-if="$x.totalResults > 0" #default="{ query }" class="x-message">
    <p>
      <i18n class="x-text1 x-break-words desktop:x-text1-lg" path="spellcheck.message" tag="span">
        <template #query>
          <span class="x-text x-font-bold x-text-auxiliary-50">
            {{ query }}
          </span>
        </template>
      </i18n>
      <SpellcheckButton class="x-padding--left-01 x-button x-button-lead x-button-link" />
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
