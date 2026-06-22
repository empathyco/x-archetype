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
