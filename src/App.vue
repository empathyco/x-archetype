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

<script lang="ts">
import type { SnippetConfig, UrlParams, XEvent } from '@empathyco/x-components'
import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import type { InternalSearchRequest, InternalSearchResponse } from '@empathyco/x-components/search'
import type { ComputedRef } from 'vue'
import { SnippetCallbacks, useXBus } from '@empathyco/x-components'
import { ExperienceControls } from '@empathyco/x-components/experience-controls'
import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params'
import { Tagging } from '@empathyco/x-components/tagging'
import { UrlHandler } from '@empathyco/x-components/url'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue'
import { useDevice } from './composables/use-device.composable'
import { isIOS } from './composables/use-is-ios-composable'
import currencies from './i18n/currencies'
import './tailwind/index.css'

export default defineComponent({
  components: {
    SnippetCallbacks,
    SnippetConfigExtraParams,
    Tagging,
    UrlHandler,
    ExperienceControls,
    MainModal: defineAsyncComponent(() =>
      import('./components/custom-main-modal.vue').then(m => m.default),
    ),
  },
  setup() {
    const xBus = useXBus()
    const appInstance = getCurrentInstance()
    const { deviceName } = useDevice()
    const snippetConfig = inject<SnippetConfig>('snippetConfig')!
    const isOpen = ref(false)

    const openXEvents = ['UserOpenXProgrammatically', 'UserClickedOpenX']

    const open = (): void => {
      isOpen.value = true
      window.wysiwyg?.open()
    }

    openXEvents.forEach(event => xBus.on(event as XEvent, false).subscribe(open))

    const close = (): void => {
      window.wysiwyg?.close()
    }

    xBus.on('UserClickedCloseX', false).subscribe(close)

    xBus.on('UserAcceptedAQuery', false).subscribe(async (query): Promise<void> => {
      if (/^::\s*login/.test(query)) {
        await window.wysiwyg?.goToLogin()
      }
    })

    xBus
      .on('SearchRequestChanged', false)
      .subscribe((payload: InternalSearchRequest | null): void => {
        window.wysiwyg?.setContext({ query: payload?.query, spellcheckedQuery: undefined })
      })

    xBus.on('SearchResponseChanged', false).subscribe((payload: InternalSearchResponse): void => {
      if (payload.spellcheck) {
        window.wysiwyg?.setContext({ spellcheckedQuery: payload.spellcheck })
      }
    })

    xBus.on('ParamsLoadedFromUrl', false).subscribe(async (payload: UrlParams): Promise<void> => {
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

    const documentDirection = computed(() => {
      return (
        document.documentElement.dir ||
        document.body.dir ||
        (snippetConfig.documentDirection ?? 'ltr')
      )
    })

    const currencyFormat = computed(() => currencies[snippetConfig.currency!])
    provide<string>('currencyFormat', currencyFormat.value)

    const queriesPreviewInfo = computed(() => snippetConfig.queriesPreview ?? [])
    provide<ComputedRef<QueryPreviewInfo[]> | undefined>('queriesPreviewInfo', queriesPreviewInfo)

    watch(
      () => snippetConfig.uiLang,
      uiLang => appInstance?.appContext.config.globalProperties.$setLocale(uiLang ?? 'en'),
    )

    watch(deviceName, device =>
      appInstance?.appContext.config.globalProperties.$setLocaleDevice(device),
    )

    const reloadSearch = (): void => {
      xBus.emit('ReloadSearchRequested')
    }

    onMounted(() => {
      document.addEventListener('wysiwyg:reloadSearch', () => reloadSearch())
    })

    onBeforeUnmount(() => {
      document.removeEventListener('wysiwyg:reloadSearch', () => reloadSearch())
    })

    //fix keyboard issue on iOS
    if (isIOS()) {
      const handleTouchMove = () => {
        if (document.activeElement && document.activeElement.matches('.x-search-input')) {
          ;(document.activeElement as HTMLElement).blur()
        }
      }
      document.addEventListener('touchmove', handleTouchMove)
      onBeforeUnmount(() => {
        document.removeEventListener('touchmove', handleTouchMove)
      })
    }

    return {
      isOpen,
      documentDirection,
    }
  },
})
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
