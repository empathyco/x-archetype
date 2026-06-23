import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface DistriplacResult extends Result {
  description: string
  collection: string
  brand: string
  brandImage: string
}

export interface DistriplacPlatformResult extends PlatformResult {
  description: string
  collection: string
  brand: string
  brandImage: string
}
