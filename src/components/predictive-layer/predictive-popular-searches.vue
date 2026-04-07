<template>
  <div class="x-mt-8 x-flex x-flex-col x-gap-4 desktop:x-mt-0">
    <div class="x-flex x-min-h-32 x-items-center">
      <h1 class="x-title4 x-title4-sm x-uppercase">
        {{ $t('popularSearches.title') }}
      </h1>
    </div>
    <component
      :is="horizontalLayout ? SlidingPanel : 'div'"
      :show-buttons="false"
      :reset-on-content-change="false"
      button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
    >
      <PopularSearches
        :animation="animation"
        :max-items-to-render="horizontalLayout ? 5 : 4"
        class="x-gap-8 desktop:x-gap-4"
        :class="{ 'xds:suggestions--horizontal': horizontalLayout }"
      >
        <template #suggestion="{ suggestion }">
          <PopularSearch
            class="x-suggestion"
            :class="{
              'x-suggestion-outlined x-gap-8': horizontalLayout,
              'x-suggestion-lg desktop:x-suggestion-md': !horizontalLayout,
            }"
            :suggestion="suggestion"
          >
            <TrendingIcon class="x-icon-lg x-mb-4 desktop:x-icon-md desktop:x-mb-0" />
            <span>{{ suggestion.query }}</span>
          </PopularSearch>
        </template>
      </PopularSearches>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProp } from '@empathyco/x-components'
import { SlidingPanel, TrendingIcon, use$x } from '@empathyco/x-components'
import { PopularSearch, PopularSearches } from '@empathyco/x-components/popular-searches'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'

defineProps<{
  animation: typeof AnimationProp
}>()

const { isTabletOrLess } = useDevice()
const x = use$x()

const horizontalLayout = computed(() => isTabletOrLess.value && !x.query.searchBox)
</script>
