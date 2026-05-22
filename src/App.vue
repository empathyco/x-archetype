<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams :excluded-extra-params="excludedExtraParams" />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <ExperienceControls v-if="isOpen" />
    <CustomTeleport v-if="isTeleportViewMode" />
    <CustomMainModal v-if="!isTeleportViewMode && isOpen" data-wysiwyg="layer" />
  </div>
</template>

<script setup lang="ts">
import type { SnippetConfig, UrlParams, XEvent } from '@empathyco/x-components'
import type { QueryPreviewInfo } from '@empathyco/x-components/queries-preview'
import type { InternalSearchRequest, InternalSearchResponse } from '@empathyco/x-components/search'
import type { ComputedRef } from 'vue'
import { SnippetCallbacks, use$x } from '@empathyco/x-components'
import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params'
import { Tagging } from '@empathyco/x-components/tagging'
import { UrlHandler } from '@empathyco/x-components/url'
import { useEventListener } from '@vueuse/core'
import {
  computed,
  defineAsyncComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
} from 'vue'
import { useCustomization } from './composables/use-customization.composable'
import { FeatureFlag, useFeatureFlags } from './composables/use-feature-flags.composable'
import { isIOS, removeSearchInputFocus } from './composables/use-ios-utils-composable'
import currencies from './i18n/currencies'
import './tailwind/xds.css'

const ExperienceControls = defineAsyncComponent(() =>
  import('@empathyco/x-components/experience-controls').then(m => m.default),
)
const CustomMainModal = defineAsyncComponent(() =>
  import('./components/index-empty-search').then(m => m.CustomMainModal),
)
const CustomTeleport = defineAsyncComponent(() =>
  import('./components/index-empty-search').then(m => m.CustomTeleport),
)

const { init } = useCustomization()
init()

const x = use$x()
const { isFeatureEnabled } = useFeatureFlags()
const snippetConfig = inject<SnippetConfig>('snippetConfig')!
const isOpen = ref(false)
const showNextQueriesTags = ref(true)

const teleportFeature = isFeatureEnabled(FeatureFlag.TELEPORT_FEATURE)

const openXEvents = ['UserOpenXProgrammatically', 'UserClickedOpenX']

const open = (): void => {
  isOpen.value = true
  window.wysiwyg?.open()
}

openXEvents.forEach(event => x.on(event as XEvent, false).subscribe(open))

const excludedExtraParams = [
  'callbacks',
  'cart',
  'currency',
  'layerSelector',
  'queriesPreview',
  'resultsSelector',
  'searchBoxSelector',
  'viewMode',
  'wishlist',
]

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
  window.wysiwyg?.setConfig({ query: payload?.query, spellcheckedQuery: undefined })
})

x.on('SearchResponseChanged', false).subscribe((payload: InternalSearchResponse): void => {
  if (payload.spellcheck) {
    window.wysiwyg?.setConfig({ spellcheckedQuery: payload.spellcheck })
  }
})

x.on('ParamsLoadedFromUrl', false).subscribe(async (payload: UrlParams): Promise<void> => {
  try {
    if (window.wysiwyg) {
      await window.wysiwyg?.requestAuth()
      window.InterfaceX?.search()
      window.wysiwyg?.setConfig({ query: payload.query })
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

const isTeleportViewMode = computed(() =>
  snippetConfig.viewMode ? snippetConfig.viewMode === 'embedded' : teleportFeature.value,
)

const currencyFormat = computed(() => currencies[snippetConfig.currency!])
provide('currencyFormat', currencyFormat)

const queriesPreviewInfo = computed(() => snippetConfig.queriesPreview ?? [])
provide<ComputedRef<QueryPreviewInfo[]> | undefined>('queriesPreviewInfo', queriesPreviewInfo)

const showNextQueries = computed(() => showNextQueriesTags.value)
provide('showNextQueries', showNextQueries)

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
:deep(.x-main-modal .x-modal__content) {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: auto;
}
</style>

<style>
*:not(.x-keyboard-navigation *) {
  outline: none;
}

.x-banner__title,
.x-promoted__title {
  display: none;
}
</style>
