import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface JLJResult extends Result {
  description: string
  brand: string
  isNew: boolean
  collection: string
  isLetter: boolean
  googleProductCategory: string
}

export interface JLJPlatformResult extends PlatformResult {
  description: string
  brand: string
  price: number
  id: string
  new: boolean
  collection: string
  isLetter: boolean
  googleProductCategory: string
}
