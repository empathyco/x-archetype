<template>
  <div
    class="xds:layout-item xds:my-24 xds:layout-max-width-md xds:layout-no-margin-left xds:layout-no-margin-right xds:desktop:layout-min-margin-32 xds:large:layout-max-width-lg xds:large:layout-min-margin-48"
    :class="{ 'xds:my-0': x.noResults }"
  >
    <Message data-test="no-results-message">
      <div :key="aiState" data-test="no-results-info">
        <span
          class="xds:message xds:text-lg xds:font-bold xds:text-font xds:desktop:text-xl"
          data-test="no-results-title"
        >
          {{ $t(`aiFallback.${aiState}.title`) }}
        </span>
        <span v-if="aiLoading" class="xds:message xds:pt-0" data-test="no-results-icon">
          <AISpinnerIcon class="xds:h-64 xds:w-64" />
        </span>
        <span
          class="xds:message xds:pt-0 xds:text-md xds:text-font"
          data-test="no-results-subtitle"
        >
          {{ $t(`aiFallback.${aiState}.subtitle`) }}
        </span>
      </div>
    </Message>
    <LocationProvider :location="location">
      <CustomAiCarousel :group="x.noResults" />
    </LocationProvider>
  </div>
</template>

<script setup lang="ts">
import type { FeatureLocation } from '@empathyco/x-components'
import { AISpinnerIcon, LocationProvider, Message, use$x, useState } from '@empathyco/x-components'
import { computed, ref, watchEffect } from 'vue'
import CustomAiCarousel from './custom-ai-carousel.vue'

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
