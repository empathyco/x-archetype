import type { Result } from '@empathyco/x-types'

export interface HsnResult extends Result {
  description: string
  collection: string
  brand: string
  brandImage: string
}
