<template>
  <BaseTeleport :target="searchBoxTarget">
    <section v-if="isDesktopOrGreater" class="x-relative">
      <SearchBox />
      <LocationProvider location="predictive_layer">
        <PredictiveLayer v-if="openPredictiveLayer" class="x-absolute x-shadow-lg" />
      </LocationProvider>
    </section>
    <section v-else>
      <div class="x-flex x-w-full x-gap-8 x-bg-neutral-0 x-px-8">
        <button @click="closeEmpathize">
          <ChevronLeftIcon v-if="x.query.searchBox" class="x-icon x-text-neutral-75" />
          <CrossTinyIcon v-else class="x-icon x-icon-lg x-text-neutral-75" />
        </button>
        <SearchBox class="x-flex-1" />
      </div>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer
          v-if="openPredictiveLayer"
          class="x-layout-min-margin-16 x-absolute x-left-0 x-w-full desktop:x-h-[600px]"
        />
      </LocationProvider>
    </section>
  </BaseTeleport>

  <BaseTeleport v-if="visibleGrid" :target="gridTarget">
    <DesktopTeleport v-if="isDesktopOrGreater" />
    <MobileTeleport v-else />
  </BaseTeleport>

  <div class="x-z-40">
    <BaseIdModal
      key="my-history-aside"
      class="!x-z-[50]"
      :animation="rightAsideAnimation"
      modal-id="my-history-aside"
      content-class="x-w-512 x-ml-auto x-h-full"
    >
      <MyHistoryAside />
    </BaseIdModal>

    <BaseIdModal
      key="right-aside"
      class="!x-z-[5]"
      :animation="rightAsideAnimation"
      modal-id="right-aside"
      content-class="!x-w-512 x-ml-auto x-h-full"
    >
      <DesktopAside v-if="hasSearched" />
    </BaseIdModal>

    <MyHistoryConfirmDisableModal />
  </div>

  <VariantSelector />
</template>

<script lang="ts">
import type { SnippetConfig, XEventsTypes } from '@empathyco/x-components'
import {
  animateTranslate,
  BaseIdModal,
  BaseTeleport,
  ChevronLeftIcon,
  CrossTinyIcon,
  LocationProvider,
  use$x,
} from '@empathyco/x-components'
import { computed, defineAsyncComponent, defineComponent, inject, ref } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import { useHasSearched } from '../../composables/use-has-searched.composable'
import MyHistoryAside from '../my-history/my-history-aside.vue'
import MyHistoryConfirmDisableModal from '../my-history/my-history-confirm-disable-modal.vue'
import SearchBox from '../search-box.vue'
import { DesktopAside } from '../search/index'

export default defineComponent({
  components: {
    DesktopAside,
    BaseTeleport,
    BaseIdModal,
    MyHistoryAside,
    MyHistoryConfirmDisableModal,
    CrossTinyIcon,
    ChevronLeftIcon,
    SearchBox,
    LocationProvider,
    VariantSelector: defineAsyncComponent(() =>
      import('../add2cart/variant-selector.vue').then(m => m.default),
    ),
    DesktopTeleport: defineAsyncComponent(() =>
      import('./desktop-teleport.vue').then(m => m.default),
    ),
    MobileTeleport: defineAsyncComponent(() =>
      import('./mobile-teleport.vue').then(m => m.default),
    ),
    PredictiveLayer: defineAsyncComponent(() =>
      import('../predictive-layer/predictive-layer.vue').then(m => m.default),
    ),
  },
  setup() {
    const eventsToOpenEmpathize: (keyof XEventsTypes)[] = [
      'UserFocusedSearchBox',
      'UserIsTypingAQuery',
      'UserClickedSearchBox',
    ]
    const x = use$x()
    const rightAsideAnimation = animateTranslate('right')
    const { isDesktopOrGreater } = useDevice()
    const snippetConfig = inject<SnippetConfig>('snippetConfig')!
    const { hasSearched } = useHasSearched()

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

    return {
      x,
      rightAsideAnimation,
      visibleGrid,
      searchBoxTarget,
      gridTarget,
      isDesktopOrGreater,
      hasSearched,
      openPredictiveLayer,
      closeEmpathize,
    }
  },
})
</script>

<style>
.x-base-teleport {
  width: 100%;
}
</style>
