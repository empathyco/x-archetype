<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams :excluded-extra-params="excludedExtraParams" />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <template v-if="isTeleportViewMode">
      <template v-if="isDesktopOrGreater">
        <DesktopInitTeleport :is-open="isOpen" />
        <DesktopTeleport v-if="isOpen" />
      </template>
      <template v-else>
        <MobileInitTeleport :is-open="isOpen" />
        <MobileTeleport v-if="isOpen" />
      </template>
    </template>
    <CustomMainModal v-if="!isTeleportViewMode && isOpen" data-wysiwyg="layer" />
  </div>
</template>

<script setup lang="ts">
import type { SnippetConfig, UrlParams, XEvent } from '@empathyco/x-components'
import type { ExperienceControlsState } from '@empathyco/x-components/experience-controls'
import type { InternalSearchRequest, InternalSearchResponse } from '@empathyco/x-components/search'
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
import DesktopInitTeleport from './components/desktop/desktop-init-teleport.vue'
import MobileInitTeleport from './components/mobile/mobile-init-teleport.vue'
import { useDevice } from './composables/use-device.composable'
import { useExperienceControls } from './composables/use-experience-controls.composable'
import { FeatureFlag, useFeatureFlags } from './composables/use-feature-flags.composable'
import { isIOS, removeSearchInputFocus } from './composables/use-ios-utils-composable'
import { initCustomization } from './utils/customization'
import './tailwind/xds.css'

const MobileTeleport = defineAsyncComponent(() =>
  import('./components/x-empty-search').then(m => m.MobileTeleport),
)

const DesktopTeleport = defineAsyncComponent(() =>
  import('./components/x-empty-search').then(m => m.DesktopTeleport),
)
const CustomMainModal = defineAsyncComponent(() =>
  import('./components/x-empty-search').then(m => m.CustomMainModal),
)

const x = use$x()
const { isDesktopOrGreater } = useDevice()
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
  'resultsSelector',
  'searchBoxSelector',
  'viewMode',
  'wishlist',
]

const close = (): void => {
  window.wysiwyg?.close()
}

// TODO: review controls.controls in X project to avoid this type assertions
x.on('ExperienceControlsChanged', false).subscribe(payload => {
  initCustomization(payload as unknown as ExperienceControlsState)
  useExperienceControls().controls.value = payload.controls as ExperienceControlsState['controls']
})

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
