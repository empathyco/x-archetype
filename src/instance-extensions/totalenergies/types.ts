import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface TotalenergiesResult extends Result {
  season: string
  subcategory: string
  description: string
}

export interface TotalenergiesPlatformResult extends PlatformResult {
  season: string
  privateUrl: string
  subcategory: string
  description: string
}
