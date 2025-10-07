<template>
  <div
    v-if="showNextQueries"
    class="x-relative x-flex x-flex-col x-gap-16 x-rounded-lg x-border-1 x-border-neutral-100 x-pb-20 x-pt-16 desktop:x-pl-[28px] desktop:x-pr-[80px]"
  >
    <i18n-t
      class="x-text1 x-text1-lg max-desktop:x-px-16"
      tag="h1"
      keypath="nextQueriesCta.message"
      scope="global"
    >
      <template #query>
        <span class="x-title3">
          {{ query }}
        </span>
      </template>
    </i18n-t>

    <SlidingPanel
      :show-buttons="!isTouchable"
      class="x-sliding-panel-show-buttons-on-hover"
      :button-class="
        'x-button x-bg-neutral-0 x-button-sm' +
        'x-button-outlined x-h-40 x-rounded-full x-border-neutral-25 x-px-16'
      "
      scroll-container-class="desktop:x-sliding-panel-fade x-px-8 desktop:x-px-0"
    >
      <template #sliding-panel-left-button>
        <ChevronLeftIcon class="x-icon-neutral-90 x-icon-lg" />
      </template>

      <div class="x-flex x-gap-[10px]">
        <NextQuery
          v-for="(suggestion, index) in x.nextQueries"
          :key="index"
          class="x-tag x-tag-neutral x-tag-solid x-h-[40px] x-gap-8 x-bg-neutral-0 x-px-16 x-text-neutral-50"
          :suggestion="suggestion"
        >
          <span>{{ suggestion.query }}</span>
          <ArrowRightIcon class="x-icon-lg" />
        </NextQuery>
      </div>

      <template #sliding-panel-right-button>
        <ChevronRightIcon class="x-icon-neutral-90 x-icon-lg" />
      </template>
    </SlidingPanel>
    <button
      class="x-button x-button-circle x-button-tight x-absolute x-right-2 x-top-2 desktop:x-right-0 desktop:x-top-0"
      :ariaLabel="$t('nextQueries.close')"
      @click="emitCloseNextQueries"
    >
      <CrossIcon class="x-icon x-icon-stroke-width-lg x-text-neutral-90" />
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
