import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface SanitasResult extends Result {
  description: string
}

export interface SanitasPlatformResult extends PlatformResult {
  metaDescription: string
}
