import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useEnvironment } from './use-environment.composable'

/**
 * Enum of feature flag keys to prevent typing errors.
 */
export enum FeatureFlag {
  TELEPORT_FEATURE = 'RST-8888-teleport-feature',
  RELATED_PROMPTS = 'RST-9999-related-prompts',
  // Add new feature flags here
}

/**
 * Static feature flags configuration.
 * Add new features here with their production status.
 */
export const FEATURE_FLAGS: Record<FeatureFlag, boolean> = {
  // Examples:
  [FeatureFlag.TELEPORT_FEATURE]: false, // Not ready for production
  [FeatureFlag.RELATED_PROMPTS]: true, // Enabled in production
}

/**
 * Simplified composable to check feature flags.
 *
 * @returns Method to check if features are enabled.
 */
export function useFeatureFlags(): {
  isFeatureEnabled: (featureId: FeatureFlag) => ComputedRef<boolean>
} {
  const { isProd } = useEnvironment()

  /**
   * Checks if a feature should be visible
   * - In production: only if the feature flag is set to true
   * - In non-production: always visible for testing purposes.
   *
   * @param featureId - The ID of the feature to check.
   * @returns Whether the feature should be visible.
   */
  function isFeatureEnabled(featureId: FeatureFlag): ComputedRef<boolean> {
    return computed(() => {
      // If feature is not registered, warn and disable it
      if (FEATURE_FLAGS[featureId] === undefined) {
        console.warn(`Feature "${featureId}" not registered in FEATURE_FLAGS. Disabling it.`)
        return false
      }

      // In production, respect the static flag value
      // In non-production environments, always enable the feature
      return isProd.value ? FEATURE_FLAGS[featureId] : true
    })
  }

  return {
    isFeatureEnabled,
  }
}
