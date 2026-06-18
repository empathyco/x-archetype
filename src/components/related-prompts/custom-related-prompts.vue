<template>
  <div class="xds:flex xds:flex-col">
    <RelatedPrompts :class="isDesktopOrGreater ? 'xds:mt-24' : 'xds:mt-16'" />
    <CustomQueryPreview
      v-if="x.selectedPrompt !== -1"
      :key="queriesPreviewInfo.length"
      class="xds:rounded-b-md xds:border xds:border-neutral-25 xds:bg-neutral-0 xds:px-16"
      :queries-preview-info="queriesPreviewInfo"
      query-feature="related_prompts"
    ></CustomQueryPreview>
  </div>
</template>

<script setup lang="ts">
import type { RelatedPromptNextQuery } from '@empathyco/x-types'
import { use$x } from '@empathyco/x-components'
import { relatedPromptsXModule } from '@empathyco/x-components/related-prompts'
import { computed } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import CustomQueryPreview from '../search/results/custom-query-preview.vue'
import RelatedPrompts from './related-prompts.vue'

defineOptions({
  xModule: relatedPromptsXModule.name,
})

const x = use$x()
const { isDesktopOrGreater } = useDevice()

const queriesPreviewInfo = computed(() => {
  if (x.relatedPrompts.length) {
    const queries = [] as string[]
    x.relatedPrompts[x.selectedPrompt]?.relatedPromptNextQueries?.forEach(
      (nextQuery: RelatedPromptNextQuery) => queries.push(nextQuery.query),
    )
    return queries.map(query => ({ query }))
  }
  return []
})
</script>
