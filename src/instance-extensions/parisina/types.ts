import type { Result, ResultVariant } from '@empathyco/x-types'

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
}

export interface ParisinaResultVariant extends ResultVariant {
  originalPrice: number
  specialPrice: number
  name: string
  attributes: string[]
  image: string
  sku: string
}
