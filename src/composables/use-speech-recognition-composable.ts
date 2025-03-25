import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'
import { XEvent, use$x } from '@empathyco/x-components'

/**
 * Implements the voice recognition functionality.
 * @param {Ref<any>} inputRef - Reference to the SearchInput where the voice recognition will be typed.
 * @returns {Object} - Object containing the reactive isListening flag and the function to toggle voice recognition.
 */
export function useSpeechRecognition(inputRef: Ref<any>) {
  const isListening = ref(false)
  let recognition: any = null
  const x = use$x()

  // Function to programmatically set the input value and dispatch the necessary events
  const setInputValue = (value: string) => {
    if (inputRef.value && inputRef.value.inputElement) {
      const inputElement = inputRef.value.inputElement as HTMLInputElement
      inputElement.value = value

      // Dispatch event to simulate user typing
      const inputEvent = new Event('input', { bubbles: true })
      inputElement.dispatchEvent(inputEvent)

      x.emit('UserIsTypingAQuery' as XEvent, value, { target: inputElement })
    }
  }

  onMounted(() => {
    // Initialize SpeechRecognition, TODO: research possible params
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      recognition.lang = 'en-US' //BCP 47 Language Tags TODO: make it dynamic
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

  return {
    isListening,
    toggleVoiceRecognition,
  }
}
