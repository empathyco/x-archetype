import type { Result } from '@empathyco/x-types'

export interface SterenResult extends Result {
  hasVariants?: boolean
  maxSale?: number
  availableQuantity?: number
  isOutOfStock?: boolean
  measurementUnit?: string
  specialPrice?: number
}
