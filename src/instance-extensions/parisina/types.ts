import type { Result } from '@empathyco/x-types'

export interface ParisinaResult extends Result {
  hasVariants?: boolean
  maxSale?: number
  availableQuantity?: number
  isOutOfStock?: boolean
  measurementUnit?: string
  attributes?: any
  sku: string
  specialPrice?: number
  image: string
  originalPrice: number
  variants?: any[]
}
