import type { SnippetConfig } from '@empathyco/x-components'
import type { Component } from 'vue'
import { computed, defineAsyncComponent, inject } from 'vue'
import DefaultResult from '../instance-extensions/empathy/result.vue'

interface InstanceExtensionModule {
  Result?: Component
}

export function useInstanceExtensions() {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')!
  const resultComponent = computed(() =>
    defineAsyncComponent(async () => {
      const m = (await import(`../instance-extensions/${snippetConfig.instance}.ts`).catch(
        () => ({}),
      )) as InstanceExtensionModule
      return m.Result ?? DefaultResult
    }),
  )

  return { resultComponent }
}
