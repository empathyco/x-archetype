<template>
  <div class="x-mb-64 x-flex x-flex-col">
    <i18n-t
      class="x-no-results-message x-text1 x-mb-24 x-flex x-flex-wrap x-gap-4 x-items-center x-justify-center x-break-words x-bg-neutral-10 x-p-24 x-text-center x-text-neutral-90 desktop:x-text1-lg"
      keypath="relatedPrompts.title"
      tag="p"
      scope="global"
    >
      <template #query>
        <span class="x-title3 x-w-auto">"{{ x.query.search }}"</span>
      </template>
      <template #message>
        <span class="x-w-auto">{{ $t('relatedPrompts.message') }}</span>
      </template>
    </i18n-t>

    <div class="x-flex x-flex-col">
      <RelatedPrompts :class="isDesktopOrGreater ? 'x-mt-24' : 'x-mt-16'" />
      <CustomQueryPreview
        v-if="selectedPrompt !== -1"
        :key="queriesPreviewInfo.length"
        class="x-rounded-b-[12px] x-bg-neutral-10 x-px-16"
        :queries-preview-info="queriesPreviewInfo"
        query-feature="related_prompts"
      ></CustomQueryPreview>
    </div>
  </div>
</template>
<script lang="ts">
import type { RelatedPrompt, RelatedPromptNextQuery } from '@empathyco/x-types'
import type { PropType } from 'vue'
import { use$x, useState } from '@empathyco/x-components'
import { relatedPromptsXModule } from '@empathyco/x-components/related-prompts'
import { computed, defineComponent } from 'vue'
import { useDevice } from '../../composables/use-device.composable'
import CustomQueryPreview from '../search/results/custom-query-preview.vue'
import RelatedPrompts from './related-prompts.vue'

export default defineComponent({
  name: 'CustomRelatedPrompts',
  xModule: relatedPromptsXModule.name,
  components: {
    RelatedPrompts,
    CustomQueryPreview,
  },
  props: {
    relatedPromptList: {
      type: Array as PropType<RelatedPrompt[]>,
      required: true,
      default: () => [],
    },
  },
  setup() {
    const x = use$x()
    const { isDesktopOrGreater } = useDevice()
    const { relatedPrompts, selectedPrompt } = useState('relatedPrompts', [
      'relatedPrompts',
      'selectedPrompt',
    ])

    const queriesPreviewInfo = computed(() => {
      if (relatedPrompts.value.length) {
        const queries = [] as string[]
        relatedPrompts.value[selectedPrompt.value].relatedPromptNextQueries.forEach(
          (nextQuery: RelatedPromptNextQuery) => queries.push(nextQuery.query),
        )
        return queries.map(query => ({ query }))
      }
      return []
    })

    return {
      isDesktopOrGreater,
      queriesPreviewInfo,
      selectedPrompt,
      x,
    }
  },
})
</script>
