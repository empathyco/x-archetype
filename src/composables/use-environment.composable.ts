import type { SnippetConfig } from '@empathyco/x-components'
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'

const PRO = 'PRODUCTION'
const STA = 'STAGING'
const DEV = 'DEVELOPMENT'

/**
 *
 * Composable to access and check environment variables.
 *
 * @returns An object with methods to get environment variables and check environment state.
 */
export function useEnvironment(): {
  currentEnvironment: ComputedRef<string>
  isProd: ComputedRef<boolean>
} {
  const snippetConfig = inject<SnippetConfig>('snippetConfig')

  /**
   * Gets the environment value reactively.
   *
   * NOTE: If env is undefined or unrecognized, as security measure, we assume production.
   *
   * @returns The environment value or undefined.
   */
  const currentEnvironment = computed(() => {
    switch (snippetConfig?.env as string) {
      case '':
        return PRO
      case 'staging':
        return STA
      case 'test':
        return DEV
      default:
        return PRO
    }
  })

  /**
   * Checks if the current environment is production.
   *
   * @returns True if in production environment.
   */
  const isProd = computed(() => currentEnvironment.value === PRO)

  return {
    currentEnvironment,
    isProd,
  }
}
