import type { XEvent } from '@empathyco/x-components'
import type { SearchInput, SnippetConfig } from '@empathyco/x-components/types'
import type { Ref } from 'vue'
import { use$x } from '@empathyco/x-components'
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'

/* eslint-disable ts/no-floating-promises */

/**
 * Implements the voice recognition functionality.
 * @param {Ref<InstanceType<typeof SearchInput>>} inputRef - Reference to the SearchInput where the voice recognition will be typed.
 * @returns {object} - Object containing the reactive isListening flag and the function to toggle voice recognition.
 */
export function useSpeechRecognition(inputRef: Ref<InstanceType<typeof SearchInput>>) {
  const isListening = ref(false)
  let recognition: SpeechRecognition | null = null
  const x = use$x()

  const snippetConfig = inject<SnippetConfig>('snippetConfig')
  //BCP 47 Language Tag
  const langCode = computed(() => {
    switch (snippetConfig?.lang) {
      case 'en':
        return 'en-US'
      case 'es':
        return 'es-ES'
      case 'fr':
        return 'fr-FR'
      case 'de':
        return 'de-DE'
      case 'it':
        return 'it-IT'
      case 'pt':
        return 'pt-PT'
      default:
        return 'en-US'
    }
  })

  // Function to programmatically set the input value and dispatch the necessary events
  const setInputValue = (value: string) => {
    const inputElement = inputRef.value?.inputElement as HTMLInputElement
    if (inputElement) {
      inputElement.value = value

      // Dispatch event to simulate user typing
      const inputEvent = new Event('input', { bubbles: true })
      inputElement.dispatchEvent(inputEvent)

      x.emit('UserIsTypingAQuery' as XEvent, value, { target: inputElement })
    }
  }

  //Emulates clicking in the search box, opening the keyboard, and clicking the OK button.
  const emulateKeyboardOkSearchInput = (): void => {
    const shadowHost = document.querySelector('.x-root-container')
    if (shadowHost?.shadowRoot) {
      const input = shadowHost.shadowRoot.querySelector('.x-search-input') as HTMLInputElement
      if (input) {
        input.focus()
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      }
    } else {
      const input = document.querySelector('.x-search-input') as HTMLInputElement
      if (input) {
        input.focus()
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      }
    }
  }
  onMounted(() => {
    // Initialize SpeechRecognition, TODO: research possible params
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      console.log(langCode.value)
      const SpeechRecognitionConstructor =
        window.SpeechRecognition || window.webkitSpeechRecognition
      recognition = new SpeechRecognitionConstructor()
      recognition.lang = langCode.value
      recognition.continuous = false // when false, it stops automatically upon detecting silence; when true, it requires a button press to stop
      recognition.interimResults = true // Returns partial results while speaking

      //Event handlers
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')
        setInputValue(transcript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Recognition error:', event.error)
        isListening.value = false
      }

      recognition.onend = () => {
        isListening.value = false
        const inputElement = inputRef.value?.inputElement as HTMLInputElement
        x.emit('UserAcceptedAQuery' as XEvent, inputElement.value, {
          target: inputElement,
          feature: 'search_box',
        })

        emulateKeyboardOkSearchInput()
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
      void recognition.stop()
      isListening.value = false
    } else {
      void recognition.start()
      isListening.value = true
    }
  }

  return {
    isListening,
    toggleVoiceRecognition,
  }
}
