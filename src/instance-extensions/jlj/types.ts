import type { Result } from '@empathyco/x-types'

export interface JLJResult extends Result {
  description: string
  brand: string
  isNew: boolean
  collection: string
  isLetter: boolean
  googleProductCategory: string
}
