<template>
  <div class="x-flex x-flex-col x-gap-4">
    <div class="x-flex x-min-h-32 x-items-center">
      <h1 class="x-title4 x-title4-sm x-py-8 x-uppercase desktop:x-p-0">
        {{ $t('nextQueries.title') }}
      </h1>
    </div>
    <component
      :is="horizontalLayout ? SlidingPanel : 'div'"
      :show-buttons="false"
      :reset-on-content-change="false"
      button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
    >
      <NextQueries
        :animation="animation"
        :max-items-to-render="horizontalLayout ? 5 : 3"
        class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
        :class="{ 'xds:suggestions--horizontal': horizontalLayout }"
      >
        <template #suggestion="{ suggestion }">
          <NextQuery
            class="x-suggestion"
            :class="{
              'x-suggestion-outlined': horizontalLayout,
              'x-suggestion-lg desktop:x-suggestion-md': !horizontalLayout,
            }"
            :suggestion="suggestion"
          >
            <CuratedCheckIcon
              v-if="suggestion.isCurated"
              class="x-icon-lg x-mb-4 desktop:x-icon-md desktop:x-mb-0"
            />
            <LightBulbOn v-else class="x-icon-lg x-mb-4 desktop:x-icon-md desktop:x-mb-0" />
            <span>{{ suggestion.query }}</span>
          </NextQuery>
        </template>
      </NextQueries>
    </component>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProp } from '@empathyco/x-components'
import { CuratedCheckIcon, LightBulbOn, SlidingPanel, use$x } from '@empathyco/x-components'
import { NextQueries, NextQuery } from '@empathyco/x-components/next-queries'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'

defineProps<{
  animation: typeof AnimationProp
}>()

const { isTabletOrLess } = useDevice()
const x = use$x()

const horizontalLayout = computed(() => isTabletOrLess.value && !x.query.searchBox)
</script>
