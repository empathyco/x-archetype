<template>
  <AiCarousel
    class="[--x-ai-carousel-color-lighter:var(--xds-color-neutral-10)] [--x-ai-carousel-color:var(--xds-color-neutral-50)] xds:mt-6 xds:mb-32"
  >
    <template #result="{ result }: { result: ResultType }">
      <component
        :is="instanceResultComponent"
        :key="result.id"
        class="xds:w-[35vw] xds:rounded-md xds:bg-neutral-0 xds:p-3 xds:desktop:w-54"
        :result="result"
      />
    </template>
  </AiCarousel>
</template>

<script setup lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import type { Result as ResultType } from '@empathyco/x-types'
import { AiCarousel } from '@empathyco/x-components/ai'
import { inject } from 'vue'
import { componentsMap } from '../results/result-cards'

const snippetConfig = inject<SnippetConfig>('snippetConfig')!

const instanceResultComponent = componentsMap[snippetConfig.instance as keyof typeof componentsMap]
</script>
