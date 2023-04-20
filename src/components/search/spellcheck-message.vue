<template>
  <Spellcheck
    v-if="$x.totalResults > 0"
    #default="{ query }"
    class="x-flex x-flex-col x-items-center x-gap-8 x-bg-neutral-10 x-p-24 x-text-center"
  >
    <p>
      <i18n class="x-text1 x-break-words desktop:x-text1-lg" path="spellcheck.message" tag="span">
        <template #query>
          <span class="x-font-bold x-text-auxiliary-50">
            {{ query }}
          </span>
        </template>
      </i18n>
      <SpellcheckButton class="x-button-lead x-button-link x-button x-pl-2" />
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
