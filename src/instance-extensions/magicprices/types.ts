import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface MagicpricesResult extends Result {
  isDeal: boolean
  hasPromoCode: boolean
}

export interface MagicpricesPlatformResult extends PlatformResult {
  isDeal: boolean
  hasPromoCode: boolean
}
