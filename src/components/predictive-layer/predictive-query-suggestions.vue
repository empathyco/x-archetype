<template>
  <QuerySuggestions
    :animation="animation"
    :max-items-to-render="5"
    class="xds:flex xds:flex-col xds:gap-8 xds:desktop:gap-4"
  >
    <template #suggestion="{ suggestion }">
      <QuerySuggestion
        :suggestion="suggestion"
        class="xds:suggestion xds:suggestion-lg xds:desktop:suggestion-md"
      >
        <template #default="{ query }">
          <SearchIcon class="xds:icon-lg xds:desktop:icon-md" />
          <Highlight :text="suggestion.query" :highlight="query" />
        </template>
      </QuerySuggestion>
    </template>
  </QuerySuggestions>
</template>

<script setup lang="ts">
import type { AnimationProp } from '@empathyco/x-components'
import { Highlight, SearchIcon } from '@empathyco/x-components'
import { QuerySuggestion, QuerySuggestions } from '@empathyco/x-components/query-suggestions'

defineProps<{
  animation: typeof AnimationProp
}>()
</script>
