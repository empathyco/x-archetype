import type { Dictionary } from '@empathyco/x-utils'
import type { ComputedRef } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { defaultXControlsState } from '../x-components/xcontrols'

export const useExperienceControls = createSharedComposable(setup)

function setup() {
  const controls = ref(defaultXControlsState.controls as Dictionary<unknown>)

  /**
   * Safely gets a nested value from an object using dot notation.
   * @param obj - The object to traverse
   * @param path - The path to the value (e.g., 'styles.colors')
   * @returns The value at the path or undefined if not found
   */
  function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    const keys = path.split('.')
    let current: unknown = obj

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key]
      } else {
        return undefined
      }
    }

    return current
  }

  /**
   * Gets a control value by key, supporting nested keys using dot notation.
   * @param key - The control key, supports dot notation (e.g., 'styles.colors')
   * @returns The control value (assumes the key exists in controls or default controls)
   * @example
   * getControl('showSuggestions') // Direct key
   * getControl('styles.colors') // Nested key
   */
  function getControl<T>(key: string): ComputedRef<T> {
    return computed(() => {
      const value = getNestedValue(controls.value, key)

      if (value === undefined) {
        return getNestedValue(defaultXControlsState.controls, key) as T
      }

      return value as T
    })
  }

  return {
    getControl,
    controls,
  }
}
