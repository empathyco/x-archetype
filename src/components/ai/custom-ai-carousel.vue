<template>
  <AiCarousel
    class="x-mb-32 x-mt-6 [--x-ai-carousel-color-lighter:theme(colors.neutral.10)] [--x-ai-carousel-color:theme(colors.neutral.50)]"
  >
    <template #result="{ result }: { result: ResultType }">
      <Result
        :key="result.id"
        class="x-w-[35vw] x-rounded-md x-bg-neutral-0 x-p-3 desktop:x-w-[216px]"
        :result="result"
      />
    </template>
  </AiCarousel>
</template>

<script setup lang="ts">
import type { Result as ResultType } from '@empathyco/x-types'
import { AiCarousel } from '@empathyco/x-components/ai'
import Result from '../results/result.vue'
</script>
