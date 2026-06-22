import type { Result } from '@empathyco/x-types'

export interface AmetllerResult extends Result {
  bulkPrice: string
  unitInfo: string
  measurementUnit: string
  clusters: string[]
  maximumQuantity: number
}
