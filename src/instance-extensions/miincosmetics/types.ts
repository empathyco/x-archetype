import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface MiincosmeticsResult extends Result {
  availability: boolean
}

export interface MiincosmeticsPlatformResult extends PlatformResult {
  availability: string
}
