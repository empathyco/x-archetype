<template>
  <div class="xds:mb-64 xds:flex xds:flex-col">
    <i18n-t
      class="x-no-results-message xds:mb-24 xds:flex xds:flex-wrap xds:items-center xds:justify-center xds:gap-4 xds:bg-neutral-10 xds:p-24 xds:text-center xds:text1 xds:wrap-break-word xds:text-neutral-90 xds:desktop:text1-lg"
      keypath="relatedPrompts.title"
      tag="p"
      scope="global"
    >
      <template #query>
        <span class="xds:w-auto xds:title3">"{{ x.query.search }}"</span>
      </template>
      <template #message>
        <span class="xds:w-auto">{{ $t('relatedPrompts.message') }}</span>
      </template>
    </i18n-t>

    <div class="xds:flex xds:flex-col">
      <RelatedPrompts :class="isDesktopOrGreater ? 'xds:mt-24' : 'xds:mt-16'" />
      <CustomQueryPreview
        v-if="selectedPrompt !== -1"
        :key="queriesPreviewInfo.length"
        class="xds:rounded-b-xl xds:bg-neutral-10 xds:px-16"
        :queries-preview-info="queriesPreviewInfo"
        query-feature="related_prompts"
      ></CustomQueryPreview>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RelatedPrompt, RelatedPromptNextQuery } from '@empathyco/x-types'
import { use$x, useState } from '@empathyco/x-components'
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

const x = use$x()
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
