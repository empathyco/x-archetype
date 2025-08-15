<template>
  <div class="x-flex x-flex-col x-gap-4">
    <h1 class="x-title4 x-title4-sm x-py-8 x-uppercase desktop:x-p-0">
      {{ $t('nextQueries.title') }}
    </h1>
    <NextQueries
      :animation="animation"
      :max-items-to-render="3"
      class="x-flex x-flex-col x-gap-8 desktop:x-gap-4"
    >
      <template #suggestion="{ suggestion }">
        <NextQuery
          class="x-suggestion x-suggestion-lg desktop:x-suggestion-md"
          :suggestion="suggestion"
        >
          <CuratedCheckIcon v-if="suggestion.isCurated" class="x-icon-lg desktop:x-icon-md" />
          <LightBulbOn v-else class="x-icon-lg desktop:x-icon-md" />
          <span>{{ suggestion.query }}</span>
        </NextQuery>
      </template>
    </NextQueries>
  </div>
</template>

<script setup lang="ts">
import type { AnimationProp } from '@empathyco/x-components'
import { CuratedCheckIcon, LightBulbOn } from '@empathyco/x-components'
import { NextQueries, NextQuery } from '@empathyco/x-components/next-queries'

defineProps<{
  animation: typeof AnimationProp
}>()
</script>
<style lang="scss"></style>
