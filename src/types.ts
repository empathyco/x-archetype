import type { XComponentsAdapter } from '@empathyco/x-types'
import type { InjectionKey } from 'vue'
import type { Messages } from './i18n/messages.types'

/**
 * UI configuration interface for instance-specific tailwind classes by component.
 * Extend this interface to add new UI component configuration keys and its classes.
 *
 */
export interface UiConfig {
  header?: {
    root?: string
    content?: string
  }
}

export const UI_CONFIG_KEY: InjectionKey<UiConfig> = Symbol('ui')

export interface InstanceExtensions {
  adapter?: XComponentsAdapter
  ui?: UiConfig
  messages?: Record<string, Partial<Messages>>
}
