<template>
  <div class="x-input-group x-input-group-lead x-rounded-sm">
    <SearchInput
      ref="searchInputRef"
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="true"
      class="desktop:!x-pl-24"
    />

    <button class="x-input-group-button x-rounded-full" @click="toggleVoiceRecognition">
      <span v-if="isListening">🛑</span>
      <span v-else>🎤</span>
    </button>

    <ClearSearchInput
      v-if="isDesktopOrGreater && x.query.searchBox"
      class="x-input-group-button x-input-group-button-rectangle"
    >
      {{ $t('searchBox.clear') }}
    </ClearSearchInput>

    <SearchButton
      v-if="isDesktopOrGreater || !x.query.searchBox"
      class="x-input-group-button-primary"
    >
      <SearchIcon class="x-icon-md" />
    </SearchButton>

    <ClearSearchInput v-else class="x-input-group-button-primary">
      <CrossTinyIcon class="x-icon-lg" />
    </ClearSearchInput>
  </div>
</template>

<script lang="ts">
import { CrossTinyIcon, SearchIcon, use$x } from '@empathyco/x-components'
import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box'
import { defineComponent, ref } from 'vue'
import { useDevice } from '../composables/use-device.composable'
import { useSpeechRecognition } from '../composables/use-speech-recognition-composable'

export default defineComponent({
  components: {
    ClearSearchInput,
    CrossTinyIcon,
    SearchButton,
    SearchInput,
    SearchIcon,
  },
  setup() {
    const { isDesktopOrGreater } = useDevice()
    const x = use$x()
    const searchInputRef = ref<InstanceType<typeof SearchInput>>(null as any)
    const { isListening, toggleVoiceRecognition } = useSpeechRecognition(searchInputRef)

    return {
      isDesktopOrGreater,
      x,
      searchInputRef,
      isListening,
      toggleVoiceRecognition,
    }
  },
})
</script>
