<template>
  <div
    v-if="showNextQueries"
    class="xds:relative xds:flex xds:flex-col xds:gap-16 xds:rounded-lg xds:border-1 xds:border-neutral-100 xds:pt-16 xds:pb-20 xds:desktop:pr-80 xds:desktop:pl-28"
  >
    <i18n-t
      class="xds:text1 xds:text1-lg xds:max-desktop:px-16"
      tag="h1"
      keypath="nextQueriesCta.message"
      scope="global"
    >
      <template #query>
        <span class="xds:title3">
          {{ query }}
        </span>
      </template>
    </i18n-t>

    <SlidingPanel
      :show-buttons="!isTouchable"
      class="xds:sliding-panel-show-buttons-on-hover"
      :button-class="
        'xds:button xds:bg-neutral-0 xds:button-sm' +
        'xds:button-outlined xds:h-40 xds:rounded-full xds:border-neutral-25 xds:px-16'
      "
      scroll-container-class="xds:desktop:sliding-panel-fade xds:px-8 xds:desktop:px-0"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="xds:icon-lg xds:icon-neutral-90" />
      </template>

      <div class="xds:flex xds:gap-2.5">
        <NextQuery
          v-for="(suggestion, index) in x.nextQueries"
          :key="index"
          class="xds:tag xds:h-40 xds:gap-8 xds:tag-neutral xds:bg-neutral-0 xds:px-16 xds:text-neutral-50"
          :suggestion="suggestion"
        >
          <span>{{ suggestion.query }}</span>
          <ArrowRightIcon class="xds:icon-lg" />
        </NextQuery>
      </div>

      <template #sliding-panel-right-button>
        <ChevronRightIcon class="xds:icon-lg xds:icon-neutral-90" />
      </template>
    </SlidingPanel>
    <button
      class="xds:absolute xds:top-2 xds:right-2 xds:button xds:button-circle xds:button-tight xds:desktop:top-0 xds:desktop:right-0"
      :ariaLabel="$t('nextQueries.close')"
      @click="emitCloseNextQueries"
    >
      <CrossIcon class="xds:icon xds:icon-stroke-width-lg xds:text-neutral-90" />
    </button>
  </div>
</template>

<script lang="ts">
import type { Ref } from 'vue'
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CrossIcon,
  SlidingPanel,
  use$x,
  useGetter,
} from '@empathyco/x-components'
import { NextQuery } from '@empathyco/x-components/next-queries'
import { computed, defineComponent, inject } from 'vue'
import { useDevice } from '../../../composables/use-device.composable'

export default defineComponent({
  name: 'NextQueriesTags',
  components: {
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    NextQuery,
    CrossIcon,
    SlidingPanel,
  },
  setup() {
    const x = use$x()
    const { isTouchable } = useDevice()
    const query = useGetter('nextQueries').query

    const showNextQueries = computed(() => inject<Ref<boolean>>('showNextQueries')?.value)

    const emitCloseNextQueries = (): void => {
      x.emit('UserClickedCloseNextQueries')
    }

    return {
      emitCloseNextQueries,
      isTouchable,
      query,
      showNextQueries,
      x,
    }
  },
})
</script>
