<template>
  <BaseTeleport :target="searchBoxTarget">
    <section v-if="isDesktopOrGreater" class="xds:relative">
      <SearchBox />
      <LocationProvider location="predictive_layer">
        <PredictiveLayer v-if="openPredictiveLayer" class="xds:absolute xds:shadow-lg" />
      </LocationProvider>
    </section>
    <section v-else>
      <div class="xds:flex xds:w-full xds:gap-8 xds:bg-neutral-0 xds:px-8">
        <button @click="closeEmpathize">
          <ChevronLeftIcon v-if="x.query.searchBox" class="xds:icon xds:text-neutral-75" />
          <CrossTinyIcon v-else class="xds:icon xds:icon-lg xds:text-neutral-75" />
        </button>
        <SearchBox class="xds:flex-1" />
      </div>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer
          v-if="openPredictiveLayer"
          class="xds:absolute xds:left-0 xds:w-full xds:layout-min-margin-16 xds:desktop:h-150"
        />
      </LocationProvider>
    </section>
  </BaseTeleport>

  <BaseTeleport v-if="visibleGrid" :target="gridTarget">
    <DesktopTeleport v-if="isDesktopOrGreater" />
    <MobileTeleport v-else />
  </BaseTeleport>

  <div class="xds:z-40">
    <BaseIdModal
      v-if="facetsPanelOverlay"
      key="right-aside"
      class="xds:z-5!"
      :animation="rightAsideAnimation"
      modal-id="right-aside"
      content-class="xds:w-512! xds:ml-auto xds:h-full"
    >
      <DesktopAside v-if="hasSearched" />
    </BaseIdModal>
  </div>

  <VariantSelector />
</template>

<script setup lang="ts">
import type { SnippetConfig, XEventsTypes } from '@empathyco/x-components'
import {
  AnimateTranslate,
  BaseIdModal,
  BaseTeleport,
  ChevronLeftIcon,
  CrossTinyIcon,
  LocationProvider,
  use$x,
} from '@empathyco/x-components'
import { computed, defineAsyncComponent, h, inject, ref } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import { useExperienceControls } from '../../composables/use-experience-controls.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
// import VariantSelector from '../add2cart/variant-selector.vue'
import SearchBox from '../search-box.vue'
import DesktopTeleport from './desktop-teleport.vue'
import MobileTeleport from './mobile-teleport.vue'

const DesktopAside = defineAsyncComponent(() => import('../index-search').then(m => m.DesktopAside))
const PredictiveLayer = defineAsyncComponent(() =>
  import('../index-empty-search').then(m => m.PredictiveLayer),
)

const x = use$x()
const rightAsideAnimation = h(AnimateTranslate, { animationOrigin: 'right' })
const { isDesktopOrGreater } = useDevice()
const snippetConfig = inject<SnippetConfig>('snippetConfig')!
const { hasSearched } = useHasSearched()
const { getControlFromPath } = useExperienceControls()
const facetsPanelOverlay = getControlFromPath('facetsPanelOverlay')

const eventsToOpenEmpathize: Array<keyof XEventsTypes> = [
  'UserFocusedSearchBox',
  'UserIsTypingAQuery',
  'UserClickedSearchBox',
]

const visibleGrid = ref(false)
const openPredictiveLayer = ref(false)

const searchBoxTarget = computed(
  () => snippetConfig.searchBoxSelector ?? "[data-teleport='empathy-search-box-container']",
)
const gridTarget = computed(
  () => snippetConfig.resultsSelector ?? "[data-teleport='empathy-results-container']",
)

x.on('UserClickedScrollToTop', false).subscribe(() => {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

x.on('SearchBoxQueryChanged', false).subscribe(query => {
  visibleGrid.value = query !== ''
})

const closeEmpathize = () => {
  x.emit('UserClosedEmpathize')
}

eventsToOpenEmpathize.forEach(event =>
  x.on(event, false).subscribe(() => {
    openPredictiveLayer.value = true
  }),
)
</script>

<style>
.x-base-teleport {
  width: 100%;
}
</style>
