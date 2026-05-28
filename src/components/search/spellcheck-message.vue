<template>
  <Spellcheck v-if="x.totalResults > 0" v-slot="{ query }" class="xds:message xds:desktop:flex-col">
    <Translation
      class="xds:text1 xds:desktop:text1-lg"
      keypath="spellcheck.message"
      scope="global"
      tag="p"
    >
      <template #query>
        <span class="xds:font-bold">"{{ query }}".</span>
      </template>
    </Translation>
    <SpellcheckButton
      class="xds:button xds:button-link xds:button-lead xds:pl-2 xds:text1 xds:font-bold xds:desktop:text1-lg"
    />
  </Spellcheck>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search'
import { Translation } from 'vue-i18n'

const x = use$x()
</script>
