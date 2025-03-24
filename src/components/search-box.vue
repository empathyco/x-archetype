<template>
  <div class="x-input-group x-input-group-lead x-rounded-sm">
    <SearchInput
      ref="searchInputRef"
      :autofocus="false"
      :placeholder="$t('searchBox.placeholder')"
      :instant="true"
      class="desktop:x-pl-24"
    />

    <button @click="toggleVoiceRecognition" class="x-input-group-button" style="padding: 0 10px">
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
import { CrossTinyIcon, SearchIcon, use$x, XEvent } from '@empathyco/x-components'
import { ClearSearchInput, SearchButton, SearchInput } from '@empathyco/x-components/search-box'
import { defineComponent, ref, onBeforeUnmount, onMounted } from 'vue'
import { useDevice } from '../composables/use-device.composable'

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

    const searchInputRef = ref<any>(null)
    const isListening = ref(false)
    let recognition: any = null

    onMounted(() => {
      // Initialize SpeechRecognition, TODO: research possible params
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
        recognition.lang = 'en-US' // esto es en BCP 47 Language Tags
        recognition.continuous = false // en false detecta silencio y para automaticamente, en true hay que pulsar
        recognition.interimResults = true // Devuelve resultados intermedios

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('')
          setInputValue(transcript)
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Error en el reconocimiento:', event.error)
          isListening.value = false
        }

        recognition.onend = () => {
          isListening.value = false
        }
      } else {
        console.warn('Speech Recognition API not supported in this browser.')
      }
    })

    onBeforeUnmount(() => {
      recognition?.stop()
    })

    const toggleVoiceRecognition = () => {
      if (!recognition) {
        console.warn('Speech Recognition not initialized.')
        return
      }

      if (isListening.value) {
        recognition.stop()
        isListening.value = false
      } else {
        recognition.start()
        isListening.value = true
      }
    }

    // Function to programmatically set the input value and dispatch the necessary events
    const setInputValue = (value: string) => {
      if (searchInputRef.value && searchInputRef.value.inputElement) {
        const inputElement = searchInputRef.value.inputElement as HTMLInputElement
        inputElement.value = value

        // Dispatch events to simulate user typing
        const inputEvent = new Event('input', { bubbles: true })
        inputElement.dispatchEvent(inputEvent)

        const userIsTypingEvent = new Event('UserIsTypingAQuery', { bubbles: true })
        inputElement.dispatchEvent(userIsTypingEvent)

        x.emit('UserIsTypingAQuery' as XEvent, value, { target: inputElement })
      }
    }

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
