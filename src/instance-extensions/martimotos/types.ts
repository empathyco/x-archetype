import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface MartimotosResult extends Result {
  stock: number
  discount: number
  discountPercentage: number
}

export interface MartimotosPlatformResult extends PlatformResult {
  stock: number
  discount: number
  discountPercentage: number
}
