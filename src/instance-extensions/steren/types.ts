import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface SterenResult extends Result {
  hasVariants?: boolean
  maxSale?: number
  availableQuantity?: number
  isOutOfStock?: boolean
  measurementUnit?: string
  specialPrice?: number
}

export interface SterenPlatformResult extends PlatformResult {
  variants?: any[]
  price: number
  specialPrice?: number
}
