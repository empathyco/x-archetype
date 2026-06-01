import type { SnippetConfig } from '@empathyco/x-components'
import type { Component } from 'vue'
import { computed, defineAsyncComponent, inject } from 'vue'

export function useInstanceExtensions() {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')!
  const resultComponent = computed(() =>
    defineAsyncComponent(async () =>
      import(`../instance-extensions/${snippetConfig.instance}.ts`).then(
        // eslint-disable-next-line ts/no-unsafe-member-access
        m => m.Result as Component,
      ),
    ),
  )

  return { resultComponent }
}
