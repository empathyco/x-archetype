<template>
  <RelatedPromptsTagList
    button-class="xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
    class="xds:mt-0 xds:h-80 xds:p-0 xds:text-neutral-50"
    :tag-class="tagClass"
    :tag-colors="['xds:bg-neutral-10']"
  >
    <template #sliding-panel-left-button>
      <ChevronLeftIcon class="xds:icon-lg" />
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
      <ChevronRightIcon class="xds:icon-lg" />
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

const { selectedPrompt } = useState('relatedPrompts')
const tagClass = computed(() =>
  selectedPrompt.value !== -1
    ? 'xds:rounded-t-md xds:gap-8 xds:w-[300px] xds:p-8'
    : 'xds:rounded-md xds:gap-8 xds:w-[300px] xds:p-8',
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
