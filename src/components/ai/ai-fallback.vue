<template>
  <div
    class="x-no-results-message x-font-caption x-mt-24 x-flex-col x-items-center x-justify-center"
    :class="{ 'x-flex-col': !isDesktopOrGreater }"
  >
    <Message>
      <div :key="aiState" class="x-mb-16" data-test="no-results-info">
        <span
          class="x-message x-title3 x-text-neutral-90 desktop:x-title2"
          data-test="no-results-title"
        >
          {{ $t(`noResults.AIRetry.${aiState}.title`) }}
        </span>
        <span v-if="aiLoading" class="x-message x-pt-0" data-test="no-results-icon">
          <AiSpinnerIcon class="x-h-64 x-w-64" />
        </span>
        <span class="x-message x-text1 x-pt-0 x-text-neutral-90" data-test="no-results-subtitle">
          {{ $t(`noResults.AIRetry.${aiState}.subtitle`) }}
        </span>
      </div>
    </Message>
    <CustomAiCarousel v-if="x.noResults" />
    <CustomAiOverview v-else />
  </div>
</template>

<script setup lang="ts">
import { Message, use$x, useState } from '@empathyco/x-components'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import AiSpinnerIcon from '../icons/ai-spinner-icon.vue'
import CustomAiCarousel from './custom-ai-carousel.vue'
import CustomAiOverview from './custom-ai-overview.vue'

const { isDesktopOrGreater } = useDevice()
const x = use$x()
const { suggestionsLoading, suggestionsSearchLoading, suggestionsSearch } = useState('ai')
const aiLoading = computed(() => suggestionsLoading.value || suggestionsSearchLoading.value)
const aiState = computed(() => {
  if (aiLoading.value) {
    return 'loading'
  }
  return suggestionsSearch.value.length ? 'success' : 'noResults'
})
</script>
