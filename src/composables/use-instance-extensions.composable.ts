import type { SnippetConfig } from '@empathyco/x-components'
import type { Component } from 'vue'
import type { UiConfig } from '../types'
import { defineAsyncComponent, inject } from 'vue'
import BagIcon from '../components/icons/bag-icon.vue'
import BaseResult from '../components/results/base-result.vue'
import { UI_CONFIG_KEY } from '../types'

interface InstanceExtensionModule {
  Result: Component
  BagIcon: Component
}

export function useInstanceExtensions() {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')!
  const uiConfig = inject(UI_CONFIG_KEY)

  const bagIcon = defineAsyncComponent({
    loader: async () =>
      import(
        `../instance-extensions/${snippetConfig.instance}/${snippetConfig.instance}-empty-search.ts`
      )
        .then((m: InstanceExtensionModule) => m.BagIcon)
        .catch(() => BagIcon),
    loadingComponent: BagIcon,
    errorComponent: BagIcon,
    timeout: 3000,
    delay: 0,
  })

  const resultComponent = defineAsyncComponent({
    loader: async () =>
      import(
        `../instance-extensions/${snippetConfig.instance}/${snippetConfig.instance}-empty-search.ts`
      )
        .then((m: InstanceExtensionModule) => m.Result)
        .catch(() => BaseResult),
    loadingComponent: BaseResult,
    errorComponent: BaseResult,
    timeout: 3000,
    delay: 0,
  })

  /**
   * Retrieves a UI component classes configuration by key from the instance-specific UI config.
   *
   * @param componentKey - The key of the UI component configuration to retrieve.
   * Must be a key of the UiConfig interface (e.g., 'header', 'footer', 'sidebar').
   *
   * @returns The typed configuration object for the specified component key,
   * or `undefined` if the UI config is not available or the key doesn't exist.
   *
   * @example
   * ```typescript
   * const { ui } = useInstanceExtensions()
   *
   * // Get header configuration
   * const headerConfig = ui('header')
   * if (headerConfig?.root) {
   *   console.log('Header root:', headerConfig.root)
   * }
   * ```
   */
  function ui<K extends keyof UiConfig>(componentKey: K): UiConfig[K] | undefined {
    if (!uiConfig) {
      return undefined
    }
    return uiConfig[componentKey]
  }

  return {
    bagIcon,
    resultComponent,
    ui,
  }
}
