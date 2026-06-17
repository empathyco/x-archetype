<template>
  <div class="xds:flex xds:flex-col">
    <RelatedPrompts :class="isDesktopOrGreater ? 'xds:mt-24' : 'xds:mt-16'" />
    <CustomQueryPreview
      v-if="selectedPrompt !== -1"
      :key="queriesPreviewInfo.length"
      class="xds:rounded-b-md xds:border xds:border-neutral-25 xds:bg-neutral-0 xds:px-16"
      :queries-preview-info="queriesPreviewInfo"
      query-feature="related_prompts"
    ></CustomQueryPreview>
  </div>
</template>

<script setup lang="ts">
import type { RelatedPrompt, RelatedPromptNextQuery } from '@empathyco/x-types'
import { useState } from '@empathyco/x-components'
import { relatedPromptsXModule } from '@empathyco/x-components/related-prompts'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import CustomQueryPreview from '../search/results/custom-query-preview.vue'
import RelatedPrompts from './related-prompts.vue'

defineOptions({
  xModule: relatedPromptsXModule.name,
})

defineProps<{
  relatedPromptList?: RelatedPrompt[]
}>()

const { isDesktopOrGreater } = useDevice()
const { relatedPrompts, selectedPrompt } = useState('relatedPrompts')

const queriesPreviewInfo = computed(() => {
  if (relatedPrompts.value.length) {
    const queries = [] as string[]
    relatedPrompts.value[selectedPrompt.value].relatedPromptNextQueries?.forEach(
      (nextQuery: RelatedPromptNextQuery) => queries.push(nextQuery.query),
    )
    return queries.map(query => ({ query }))
  }
  return []
})
</script>
