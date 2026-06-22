<template>
  <AiCarousel
    :title
    class="[--x-ai-carousel-color-lighter:var(--xds-color-neutral-10)] [--x-ai-carousel-color:var(--xds-color-neutral-50)] xds:mt-6 xds:mb-32 xds:text-md"
  >
    <template #result="{ result }: { result: ResultType }">
      <Result
        :key="result.id"
        class="xds:w-[35vw] xds:rounded-md xds:bg-neutral-0 xds:p-3 xds:desktop:w-54"
        :result="result"
      />
    </template>
  </AiCarousel>
</template>

<script setup lang="ts">
import type { Result as ResultType } from '@empathyco/x-types'
import { useState } from '@empathyco/x-components'
import { AiCarousel } from '@empathyco/x-components/ai'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Result from '../results/result.vue'

const { t } = useI18n()
const { queries } = useState('ai')

const title = computed(() => {
  const queryList = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  }).format(queries.value.map(({ query }) => query))
  return t('aiFallback.title', { queryList })
})
</script>
