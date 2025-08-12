<template>
  <RelatedPromptsTagList
    button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
    class="x-mt-0 x-h-[80px] x-p-0 x-text-neutral-50"
    :tag-class="tagClass"
    :tag-colors="['x-bg-neutral-10']"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="x-icon-lg" />
    </template>
    <template #default="{ relatedPrompt, isSelected, onSelect }">
      <DisplayEmitter
        :payload="relatedPrompt.tagging.toolingDisplayTagging"
        :event-metadata="{
          feature: 'related_prompts',
          displayOriginalQuery: x.query.searchBox,
          replaceable: false,
        }"
      >
        <RelatedPrompt
          :related-prompt="relatedPrompt"
          :selected="isSelected"
          data-wysiwyg="related-prompt"
          :data-wysiwyg-id="relatedPrompt.suggestionText"
          @click="onSelect"
        />
      </DisplayEmitter>
    </template>
    <template #sliding-panel-right-button>
      <ChevronRightIcon class="x-icon-lg" />
    </template>
  </RelatedPromptsTagList>
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DisplayEmitter,
  use$x,
  useState,
} from '@empathyco/x-components'
import { RelatedPrompt, RelatedPromptsTagList } from '@empathyco/x-components/related-prompts'
import { computed } from 'vue'

defineOptions({
  name: 'RelatedPrompts',
})

const { selectedPrompt } = useState('relatedPrompts')
const tagClass = computed(() =>
  selectedPrompt.value !== -1
    ? 'x-rounded-t-md x-gap-8 x-w-[300px] x-p-8'
    : 'x-rounded-md x-gap-8 x-w-[300px] x-p-8',
)
const x = use$x()
</script>

<style>
.x-related-prompt {
  display: flex;
  gap: 12px;
  align-items: baseline;
}
</style>
