<template>
  <Spellcheck v-if="x.totalResults > 0" v-slot="{ query }" class="x-message desktop:x-flex-col">
    <p>
      <i18n-t
        class="x-text1 desktop:x-text1-lg"
        keypath="spellcheck.message"
        scope="global"
        tag="p"
      >
        <template #query>
          <span class="x-w-auto x-font-bold">"{{ query }}".</span>
          <div v-if="isTabletOrLess" class="x-basis-full"></div>
        </template>
      </i18n-t>
      <SpellcheckButton
        class="x-button x-button-lead x-button-link x-text1 x-pl-2 x-font-bold desktop:x-text1-lg"
      />
    </p>
  </Spellcheck>
</template>

<script setup lang="ts">
import { use$x } from '@empathyco/x-components'
import { Spellcheck, SpellcheckButton } from '@empathyco/x-components/search'
import { useDevice } from '../../composables/use-device.composable'

const { isTabletOrLess } = useDevice()
const x = use$x()
</script>
