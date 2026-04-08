<template>
  <div class="xds:flex xds:flex-col xds:gap-4">
    <div class="xds:flex xds:min-h-32 xds:items-center">
      <h1 class="xds:py-8 xds:title4 xds:title4-sm xds:uppercase xds:desktop:p-0">
        {{ $t('nextQueries.title') }}
      </h1>
    </div>
    <component
      :is="horizontalLayout ? SlidingPanel : 'div'"
      :show-buttons="false"
      :reset-on-content-change="false"
      button-class="xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
    >
      <NextQueries
        :animation="animation"
        :max-items-to-render="horizontalLayout ? 5 : 3"
        class="xds:flex xds:flex-col xds:gap-8 xds:desktop:gap-4"
        :class="{ 'xds:suggestions--horizontal': horizontalLayout }"
      >
        <template #suggestion="{ suggestion }">
          <NextQuery
            class="xds:suggestion"
            :class="{
              'xds:suggestion-outlined': horizontalLayout,
              'xds:suggestion-lg xds:desktop:suggestion-md': !horizontalLayout,
            }"
            :suggestion="suggestion"
          >
            <CuratedCheckIcon
              v-if="suggestion.isCurated"
              class="xds:mb-4 xds:icon-lg xds:desktop:mb-0 xds:desktop:icon-md"
            />
            <LightBulbOn v-else class="xds:mb-4 xds:icon-lg xds:desktop:mb-0 xds:desktop:icon-md" />
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
