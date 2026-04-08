<template>
  <IdentifierResults
    v-slot="{ identifierResult }"
    :max-items-to-render="5"
    :animation="animation"
    class="xds:flex xds:flex-col xds:gap-8 xds:desktop:col-span-12 xds:desktop:gap-4"
  >
    <BaseResultLink
      v-slot="{ result }"
      :result="identifierResult"
      class="xds:suggestion xds:suggestion-lg xds:desktop:suggestion-md"
    >
      <BarCodeIcon class="xds:icon-lg xds:desktop:icon-md" />
      <IdentifierResult :result="result" />
      <span>
        {{ result.name }}
      </span>
    </BaseResultLink>
  </IdentifierResults>
</template>

<script setup lang="ts">
import type { AnimationProp } from '@empathyco/x-components'
import { BarCodeIcon, BaseResultLink } from '@empathyco/x-components'
import { IdentifierResult, IdentifierResults } from '@empathyco/x-components/identifier-results'

defineProps<{
  animation: typeof AnimationProp
}>()
</script>
