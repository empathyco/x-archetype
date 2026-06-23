import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface ConforamaResult extends Result {
  description: string
  brandLogoUrl: string
  energyIconUrl: string
  discount: string
  customLabel1Text: string
  customLabel2Text: string
  customLabel3Text: string
}

export interface ConforamaPlatformResult extends PlatformResult {
  description: string
  brandLogoUrl: string
  energyIconUrl: string
  discount: number
  customLabel1Text: string
  customLabel2Text: string
  customLabel3Text: string
  discountPercentage: string
  itemUrl: string
}
