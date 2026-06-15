<template>
  <BaseTeleport :target="searchBoxTarget">
    <section class="xds:relative">
      <SearchBox @click="emitUserClickedOpenX" @focusin="emitUserClickedOpenX" />
      <LocationProvider location="predictive_layer">
        <PredictiveLayer v-if="openPredictiveLayer" class="xds:absolute xds:shadow-lg" />
      </LocationProvider>
    </section>
  </BaseTeleport>
</template>

<script setup lang="ts">
import type { SnippetConfig, XEventsTypes } from '@empathyco/x-components'
import { BaseTeleport, LocationProvider, use$x } from '@empathyco/x-components'
import { computed, defineAsyncComponent, inject, ref } from 'vue'
import SearchBox from '../search-box.vue'

const props = defineProps<{ isOpen: boolean }>()

const PredictiveLayer = defineAsyncComponent(() =>
  import('../x-empty-search').then(m => m.PredictiveLayer),
)

const x = use$x()
const snippetConfig = inject<SnippetConfig>('snippetConfig')

const searchBoxTarget = computed(() => snippetConfig?.searchBoxTarget ?? '#header form')

const openPredictiveLayer = ref(false)
const eventsToOpenEmpathize: Array<keyof XEventsTypes> = [
  'UserFocusedSearchBox',
  'UserIsTypingAQuery',
  'UserClickedSearchBox',
]
eventsToOpenEmpathize.forEach(event =>
  x.on(event, false).subscribe(() => (openPredictiveLayer.value = true)),
)

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
