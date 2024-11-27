import type { ScrollComponentState } from '@empathyco/x-components/types'
import type { Dictionary } from '@empathyco/x-utils'
import type { ComputedRef, Ref } from 'vue'
import { useState } from '@empathyco/x-components'
import { computed, ref, watch } from 'vue'

export const useHasScrollPastThreshold = (): { hasScrolledPastThreshold: Ref<boolean> } => {
  const hasScrolledPastThresholdFlag = ref(false)
  const scrollOffset = 100
  const scrollPositionsMap = useState('scroll', ['data']).data as ComputedRef<
    Dictionary<ScrollComponentState>
  >
  const mainScrollPosition = computed(() => scrollPositionsMap.value['main-scroll']?.position)

  const hasScrolledPastThreshold = computed(() => hasScrolledPastThresholdFlag.value)

  watch(mainScrollPosition, () => {
    const mainScrollData = scrollPositionsMap.value['main-scroll']

    if (mainScrollData?.hasReachedStart) {
      hasScrolledPastThresholdFlag.value = false
      return
    } else {
      hasScrolledPastThresholdFlag.value = true
    }

    const isScrollingUp = mainScrollData?.direction === 'UP'
    if (isScrollingUp || mainScrollPosition.value < scrollOffset) {
      hasScrolledPastThresholdFlag.value = false
    } else if (!isScrollingUp && mainScrollPosition.value > scrollOffset) {
      hasScrolledPastThresholdFlag.value = true
    }
  })

  return {
    hasScrolledPastThreshold,
  }
}
