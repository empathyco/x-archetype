import type { Result } from '@empathyco/x-types'

export interface MartimotosResult extends Result {
  stock?: number
  discount?: number
  discountPercentage?: number
}
