<template>
  <MaxDesktopWidthItem
    class="xds:my-24 xds:layout-no-margin-left xds:layout-no-margin-right"
    :class="{ 'xds:my-0': x.noResults }"
  >
    <Message data-test="no-results-message">
      <div :key="aiState" data-test="no-results-info">
        <span
          class="xds:message xds:title3 xds:text-neutral-90 xds:desktop:title2"
          data-test="no-results-title"
        >
          {{ $t(`aiFallback.${aiState}.title`) }}
        </span>
        <span v-if="aiLoading" class="xds:message xds:pt-0" data-test="no-results-icon">
          <AISpinnerIcon class="xds:h-64 xds:w-64" />
        </span>
        <span
          class="xds:message xds:pt-0 xds:text1 xds:text-neutral-90"
          data-test="no-results-subtitle"
        >
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
import { AISpinnerIcon, LocationProvider, Message, use$x, useState } from '@empathyco/x-components'
import { computed, ref, watchEffect } from 'vue'
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
