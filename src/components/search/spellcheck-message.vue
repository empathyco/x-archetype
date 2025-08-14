<template>
  <Spellcheck v-if="x.totalResults > 0" v-slot="{ query }" class="x-message desktop:x-flex-col">
    <i18n-t class="x-text1 desktop:x-text1-lg" keypath="spellcheck.message" scope="global" tag="p">
      <template #query>
        <span class="x-font-bold">"{{ query }}".</span>
      </template>
    </i18n-t>
    <SpellcheckButton
      class="x-button x-button-lead x-button-link x-text1 x-pl-2 x-font-bold desktop:x-text1-lg"
    />
  </Spellcheck>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search'

const x = use$x()
</script>
