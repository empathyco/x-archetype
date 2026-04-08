<template>
  <MaxDesktopWidthItem
    class="x-layout-no-margin-left x-layout-no-margin-right x-my-24"
    :class="{ 'x-my-0': x.noResults }"
  >
    <Message data-test="no-results-message">
      <div :key="aiState" data-test="no-results-info">
        <span
          class="x-title3 x-text-neutral-90 desktop:x-title2 xds:message"
          data-test="no-results-title"
        >
          {{ $t(`aiFallback.${aiState}.title`) }}
        </span>
        <span v-if="aiLoading" class="x-pt-0 xds:message" data-test="no-results-icon">
          <AiSpinnerIcon class="x-h-64 x-w-64" />
        </span>
        <span class="x-text1 x-pt-0 x-text-neutral-90 xds:message" data-test="no-results-subtitle">
          {{ $t(`aiFallback.${aiState}.subtitle`) }}
        </span>
      </div>
    </Message>
    <LocationProvider :location="location">
      <CustomAiCarousel v-if="x.noResults" />
      <CustomAiOverview v-else />
    </LocationProvider>
  </MaxDesktopWidthItem>
</template>

<script setup lang="ts">
import type { FeatureLocation } from '@empathyco/x-components'
import { LocationProvider, Message, use$x, useState } from '@empathyco/x-components'
import { computed, ref, watchEffect } from 'vue'
import AiSpinnerIcon from '../icons/ai-spinner-icon.vue'
import MaxDesktopWidthItem from '../max-desktop-width-item.vue'
import CustomAiCarousel from './custom-ai-carousel.vue'
import CustomAiOverview from './custom-ai-overview.vue'

const x = use$x()
const { suggestionsStatus, suggestionsSearchStatus, suggestionsSearch } = useState('ai')

const location = computed<FeatureLocation>(() =>
  x.results.length > 0 ? 'low_results' : 'no_results',
)

const aiState = ref<'loading' | 'success' | 'noResults'>('loading')
const aiLoading = computed(() => aiState.value === 'loading')
const suggestionsLoading = computed(
  () => suggestionsStatus.value !== 'success' && suggestionsStatus.value !== 'error',
)

const suggestionsSearchLoading = computed(
  () => suggestionsSearchStatus.value !== 'success' && suggestionsSearchStatus.value !== 'error',
)

watchEffect(() => {
  if (suggestionsLoading.value || suggestionsSearchLoading.value) {
    aiState.value = 'loading'
    return
  }

  aiState.value = suggestionsSearch.value.length > 0 ? 'success' : 'noResults'
})
</script>
