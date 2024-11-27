<template>
  <div class="x-mb-32 x-flex x-flex-col">
    <i18n-t
      class="x-no-results-message x-text1 x-flex x-flex-wrap x-items-center x-justify-center x-break-words x-bg-neutral-10 x-p-24 x-text-center x-text-neutral-90 desktop:x-text1-lg"
      keypath="relatedPrompts.title"
      tag="span"
      scope="global"
    >
      <template #query>
        <span class="x-title3 x-w-auto">{{ x.query.search }}</span>
      </template>
    </i18n-t>

    <div class="x-flex x-flex-col">
      <RelatedPromptsTagList class="x-my-24" />
      <CustomQueryPreview
        v-if="selectedPrompt !== -1"
        :key="queriesPreviewInfo.length"
        class="x-rounded-[12px] x-bg-neutral-10 x-px-16"
        :queries-preview-info="queriesPreviewInfo"
      ></CustomQueryPreview>
    </div>
  </div>
</template>
<script lang="ts">
import type { RelatedPrompt } from '@empathyco/x-types'
import type { PropType } from 'vue'
import { use$x, useState } from '@empathyco/x-components'
import { relatedPromptsXModule } from '@empathyco/x-components/related-prompts'
import { computed, defineComponent } from 'vue'
import CustomQueryPreview from '../search/results/custom-query-preview.vue'
import RelatedPromptsTagList from './related-prompts-tag-list.vue'

export default defineComponent({
  name: 'CustomRelatedPrompts',
  xModule: relatedPromptsXModule.name,
  components: {
    CustomQueryPreview,
    RelatedPromptsTagList,
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
    const { relatedPrompts, selectedPrompt, selectedQuery } = useState('relatedPrompts', [
      'relatedPrompts',
      'selectedPrompt',
      'selectedQuery',
    ])

    const queriesPreviewInfo = computed(() => {
      const queries = relatedPrompts.value[selectedPrompt.value].nextQueries as string[]
      if (selectedQuery.value === -1) {
        return queries.map(query => ({ query }))
      } else {
        return [{ query: queries[selectedQuery.value] }]
      }
    })

    return {
      queriesPreviewInfo,
      selectedPrompt,
      x,
    }
  },
})
</script>
