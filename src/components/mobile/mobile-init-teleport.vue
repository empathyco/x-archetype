<template>
  <BaseTeleport :target="searchBoxSelector">
    <section>
      <div class="xds:flex xds:w-full xds:gap-8 xds:bg-neutral-0 xds:px-8">
        <button @click="closeEmpathize">
          <ChevronLeftIcon v-if="x.query.searchBox" class="xds:icon xds:text-neutral-75" />
          <CrossTinyIcon v-else class="xds:icon xds:icon-lg xds:text-neutral-75" />
        </button>
        <SearchBox
          class="xds:flex-1"
          @click="emitUserClickedOpenX"
          @focusin="emitUserClickedOpenX"
        />
        <CartCount />
      </div>
      <LocationProvider location="predictive_layer">
        <PredictiveLayer
          v-if="openPredictiveLayer"
          class="xds:absolute xds:left-0 xds:w-full xds:layout-min-margin-16 xds:desktop:h-150"
        />
      </LocationProvider>
    </section>
  </BaseTeleport>
</template>

<script setup lang="ts">
import type { SnippetConfig, XEventsTypes } from '@empathyco/x-components'
import {
  BaseTeleport,
  ChevronLeftIcon,
  CrossTinyIcon,
  LocationProvider,
  use$x,
} from '@empathyco/x-components'
import { computed, defineAsyncComponent, inject, ref } from 'vue'
import CartCount from '../add2cart/cart-count.vue'
import SearchBox from '../search-box.vue'

const props = defineProps<{ isOpen: boolean }>()

const PredictiveLayer = defineAsyncComponent(() =>
  import('../x-empty-search').then(m => m.PredictiveLayer),
)

const x = use$x()
const snippetConfig = inject<SnippetConfig>('snippetConfig')!

const openPredictiveLayer = ref(false)
const eventsToOpenEmpathize: Array<keyof XEventsTypes> = [
  'UserFocusedSearchBox',
  'UserIsTypingAQuery',
  'UserClickedSearchBox',
]
eventsToOpenEmpathize.forEach(event =>
  x.on(event, false).subscribe(() => (openPredictiveLayer.value = true)),
)

const searchBoxSelector = computed(
  () => snippetConfig.searchBoxSelector ?? "[data-teleport='empathy-search-box-container']",
)

x.on('UserClickedScrollToTop', false).subscribe(() => {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

const closeEmpathize = () => {
  x.emit('UserClosedEmpathize')
}

const emitUserClickedOpenX = (): void => {
  if (!props.isOpen) {
    x.emit('UserClickedOpenX')
  }
}
</script>

<style>
.x-base-teleport {
  width: 100%;
}
</style>
