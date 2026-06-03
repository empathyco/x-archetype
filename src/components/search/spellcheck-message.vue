<template>
  <Spellcheck v-if="x.totalResults > 0" v-slot="{ query }" class="xds:message xds:desktop:flex-col">
    <Translation
      class="xds:text-sm xds:desktop:text-md"
      keypath="spellcheck.message"
      scope="global"
      tag="p"
    >
      <template #query>
        <span class="xds:font-bold">"{{ query }}".</span>
      </template>
    </Translation>
    <SpellcheckButton
      class="xds:button xds:button-link xds:button-lead xds:pl-2 xds:text-sm xds:font-bold xds:desktop:text-md"
    />
  </Spellcheck>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search'
import { Translation } from 'vue-i18n'

const x = use$x()
</script>
