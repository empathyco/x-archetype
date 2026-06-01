import type { SnippetConfig } from '@empathyco/x-components'
import type { Component } from 'vue'
import { computed, defineAsyncComponent, inject } from 'vue'

interface InstanceExtensionModule {
  Result: Component
}

export function useInstanceExtensions() {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')!
  const resultComponent = computed(() =>
    defineAsyncComponent(async () =>
      import(`../instance-extensions/${snippetConfig.instance}.ts`).then(
        (m: InstanceExtensionModule) => m.Result,
      ),
    ),
  )

  return { resultComponent }
}
