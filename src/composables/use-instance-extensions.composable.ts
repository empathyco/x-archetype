import type { SnippetConfig } from '@empathyco/x-components'
import type { Component } from 'vue'
import { defineAsyncComponent, inject } from 'vue'
import BaseResult from '../components/results/base-result.vue'

interface InstanceExtensionModule {
  Result: Component
}

export function useInstanceExtensions() {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')!

  const resultComponent = defineAsyncComponent({
    loader: async () =>
      import(`../instance-extensions/${snippetConfig.instance}.ts`).then(
        (m: InstanceExtensionModule) => m.Result,
      ),
    loadingComponent: BaseResult,
    errorComponent: BaseResult,
    timeout: 3000,
  })

  return { resultComponent }
}
