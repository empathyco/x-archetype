import type { XComponentsAdapter } from '@empathyco/x-types'
import type { InjectionKey } from 'vue'

export interface UiConfig {
  header?: {
    root?: string
  }
}

export const UI_CONFIG_KEY: InjectionKey<UiConfig> = Symbol('ui')

export interface InstanceExtensions {
  adapter?: XComponentsAdapter
  ui?: UiConfig
}
