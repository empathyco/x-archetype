import type { Result } from '@empathyco/x-types'

export interface MagicpricesResult extends Result {
  isDeal: boolean
  hasPromoCode: boolean
}
