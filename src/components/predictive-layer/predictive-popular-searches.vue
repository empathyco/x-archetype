<template>
  <div class="xds:mt-8 xds:flex xds:flex-col xds:gap-4 xds:desktop:mt-0">
    <div class="xds:flex xds:min-h-32 xds:items-center">
      <h1 class="xds:title4 xds:title4-sm xds:uppercase">
        {{ $t('popularSearches.title') }}
      </h1>
    </div>
    <component
      :is="horizontalLayout ? SlidingPanel : 'div'"
      :show-buttons="false"
      :reset-on-content-change="false"
      button-class="xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
    >
      <PopularSearches
        :animation="animation"
        :max-items-to-render="horizontalLayout ? 5 : 4"
        class="xds:gap-8 xds:desktop:gap-4"
        :class="{ 'xds:suggestions--horizontal': horizontalLayout }"
      >
        <template #suggestion="{ suggestion }">
          <PopularSearch
            class="xds:suggestion"
            :class="{
              'xds:gap-8 xds:suggestion-outlined': horizontalLayout,
              'xds:suggestion-lg xds:desktop:suggestion-md': !horizontalLayout,
            }"
            :suggestion="suggestion"
          >
            <TrendingIcon class="xds:mb-4 xds:icon-lg xds:desktop:mb-0 xds:desktop:icon-md" />
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
