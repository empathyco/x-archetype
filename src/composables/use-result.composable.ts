import type { SnippetConfig } from '@empathyco/x-components'
import { computed, inject } from 'vue'
import { componentsMap } from '../components/results/result-cards'

export function useResult() {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')!
  const instanceResultComponent = computed(
    () => componentsMap[snippetConfig.instance as keyof typeof componentsMap],
  )

  return { instanceResultComponent }
}
