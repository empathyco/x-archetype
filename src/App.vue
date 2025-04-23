<template>
  <div class="x" data-test="x" :dir="documentDirection">
    <SnippetConfigExtraParams />
    <SnippetCallbacks />
    <Tagging />
    <UrlHandler />
    <BaseTeleport :target="relatedPromptsTarget">
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
    </BaseTeleport>
  </div>
</template>

<script lang="ts">
import type { SnippetConfig } from '@empathyco/x-components'
import type { RelatedPromptNextQuery } from '@empathyco/x-types'
import { BaseTeleport, SnippetCallbacks, use$x, useState, XPlugin } from '@empathyco/x-components'
import { SnippetConfigExtraParams } from '@empathyco/x-components/extra-params'
import { relatedPromptsXModule } from '@empathyco/x-components/related-prompts'
import { searchXModule } from '@empathyco/x-components/search'
import { Tagging } from '@empathyco/x-components/tagging'
import { UrlHandler } from '@empathyco/x-components/url'
import { computed, defineComponent, inject } from 'vue'
import RelatedPrompts from './components/related-prompts/related-prompts.vue'
import CustomQueryPreview from './components/search/results/custom-query-preview.vue'
import { useDevice } from './composables/use-device.composable'
import './tailwind/index.css'

export default defineComponent({
  components: {
    BaseTeleport,
    CustomQueryPreview,
    RelatedPrompts,
    SnippetCallbacks,
    SnippetConfigExtraParams,
    Tagging,
    UrlHandler,
  },
  setup() {
    XPlugin.registerXModule(searchXModule)
    XPlugin.registerXModule(relatedPromptsXModule)
    const x = use$x()
    const { isDesktopOrGreater } = useDevice()
    const snippetConfig = inject<SnippetConfig>('snippetConfig')!
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

    const documentDirection = computed(() => {
      return (
        document.documentElement.dir ||
        document.body.dir ||
        (snippetConfig.documentDirection ?? 'ltr')
      )
    })

    const relatedPromptsTarget = computed((): string => {
      return snippetConfig.relatedPromptsTarget ?? '.body-container'
    })

    return {
      isDesktopOrGreater,
      queriesPreviewInfo,
      selectedPrompt,
      documentDirection,
      relatedPromptsTarget,
      x,
    }
  },
})
</script>

<style scoped>
.x-modal:deep(.x-modal__content) {
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: auto;
}
</style>

<style lang="scss">
*:not(.x-keyboard-navigation *) {
  outline: none;
}

.x-banner,
.x-promoted {
  &__title {
    display: none;
  }
}
</style>
