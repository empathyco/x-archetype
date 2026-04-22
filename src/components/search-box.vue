<template>
  <div class="xds:input-group xds:rounded-sm xds:input-group-lead">
    <SearchInput
      ref="searchInputRef"
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="!!isDesktopOrGreater"
      class="xds:input xds:desktop:pl-24!"
    />

    <button class="xds:input-group-button xds:rounded-full" @click="toggleVoiceRecognition">
      <span v-if="isListening">🛑</span>
      <span v-else>🎤</span>
    </button>

    <ClearSearchInput
      v-if="isDesktopOrGreater && x.query.searchBox"
      class="xds:input-group-button xds:input-group-button-rectangle xds:hover:bg-neutral-10"
    >
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <SearchButton
      v-if="isDesktopOrGreater || !x.query.searchBox"
      class="xds:input-group-button-primary xds:input-group-button xds:p-0"
    >
      <SearchIcon />
    </SearchButton>

    <ClearSearchInput v-else class="xds:input-group-button-primary xds:input-group-button">
      <CrossTinyIcon class="xds:icon-lg" />
    </ClearSearchInput>
  </div>
</template>

<script setup lang="ts">
import { CrossTinyIcon, SearchIcon, use$x } from '@empathyco/x-components'
import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box'
import { ref } from 'vue'
import { useDevice } from '../composables/use-device.composable'
import { useSpeechRecognition } from '../composables/use-speech-recognition-composable'

const { isDesktopOrGreater } = useDevice()
const x = use$x()
const searchInputRef = ref<InstanceType<typeof SearchInput>>(null as any)
const { isListening, toggleVoiceRecognition } = useSpeechRecognition(searchInputRef)
</script>
