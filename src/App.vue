<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <ExperienceControls />
    <MainModal v-if="isOpen" data-wysiwyg="layer" />
  </div>
</template>

<script setup lang="ts">
import type { SnippetConfig, UrlParams, XEvent } from '@empathyco/x-components'
import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import type { InternalSearchRequest, InternalSearchResponse } from '@empathyco/x-components/search'
import type { ComputedRef } from 'vue'
import { SnippetCallbacks, use$x } from '@empathyco/x-components'
import { ExperienceControls } from '@empathyco/x-components/experience-controls'
import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params'
import { Tagging } from '@empathyco/x-components/tagging'
import { UrlHandler } from '@empathyco/x-components/url'
import { useEventListener } from '@vueuse/core'
import {
  computed,
  defineAsyncComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue'
import { useDevice } from './composables/use-device.composable'
import { isIOS, removeSearchInputFocus } from './composables/use-ios-utils-composable'
import currencies from './i18n/currencies'
import './tailwind/index.css'

const MainModal = defineAsyncComponent(() =>
  import('./components/custom-main-modal.vue').then(m => m.default),
)

const x = use$x()
const appInstance = getCurrentInstance()
const { deviceName } = useDevice()
const snippetConfig = inject<SnippetConfig>('snippetConfig')!
const isOpen = ref(false)
const showNextQueriesTags = ref(true)

const openXEvents = ['UserOpenXProgrammatically', 'UserClickedOpenX']

const open = (): void => {
  isOpen.value = true
  window.wysiwyg?.open()
}

openXEvents.forEach(event => x.on(event as XEvent, false).subscribe(open))

const close = (): void => {
  window.wysiwyg?.close()
}

x.on('UserClickedCloseX', false).subscribe(close)

x.on('UserAcceptedAQuery', false).subscribe(async (query): Promise<void> => {
  if (/^::\s*login/.test(query)) {
    await window.wysiwyg?.goToLogin()
  }
})

x.on('SearchRequestChanged', false).subscribe((payload: InternalSearchRequest | null): void => {
  window.wysiwyg?.setContext({ query: payload?.query, spellcheckedQuery: undefined })
})

x.on('SearchResponseChanged', false).subscribe((payload: InternalSearchResponse): void => {
  if (payload.spellcheck) {
    window.wysiwyg?.setContext({ spellcheckedQuery: payload.spellcheck })
  }
})

x.on('ParamsLoadedFromUrl', false).subscribe(async (payload: UrlParams): Promise<void> => {
  try {
    if (window.wysiwyg) {
      await window.wysiwyg?.requestAuth()
      window.InterfaceX?.search()
      window.wysiwyg?.setContext({ query: payload.query })
    }
  } catch {
    // No error handling
  }
})

x.on('UserClickedCloseNextQueries', false).subscribe(() => {
  showNextQueriesTags.value = false
})

x.on('UserAcceptedAQuery', false).subscribe(() => {
  showNextQueriesTags.value = true
})

const documentDirection = computed(() => {
  return (
    document.documentElement.dir || document.body.dir || (snippetConfig.documentDirection ?? 'ltr')
  )
})

const currencyFormat = computed(() => currencies[snippetConfig.currency!])
provide<string>('currencyFormat', currencyFormat.value)

const queriesPreviewInfo = computed(() => snippetConfig.queriesPreview ?? [])
provide<ComputedRef<QueryPreviewInfo[]> | undefined>('queriesPreviewInfo', queriesPreviewInfo)

const showNextQueries = computed(() => showNextQueriesTags.value)
provide('showNextQueries', showNextQueries)

watch(
  () => snippetConfig.uiLang,
  uiLang => appInstance?.appContext.config.globalProperties.$setLocale(uiLang ?? 'en'),
)

watch(deviceName, device =>
  appInstance?.appContext.config.globalProperties.$setLocaleDevice(device),
)

const reloadSearch = (): void => {
  x.emit('ReloadSearchRequested')
}

onMounted(() => {
  document.addEventListener('wysiwyg:reloadSearch', reloadSearch)
})

onBeforeUnmount(() => {
  document.removeEventListener('wysiwyg:reloadSearch', reloadSearch)
})

//fix keyboard issue on iOS
if (isIOS()) {
  useEventListener(document, 'touchmove', removeSearchInputFocus)
}
</script>

<style scoped>
.x-modal:deep(.x-modal__content) {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: auto;
}
</style>

<style lang="scss">
*:not(.x-keyboard-navigation *) {
  outline: none;
}

.x-banner,
.x-promoted {
  &__title {
    display: none;
  }
}
</style>
