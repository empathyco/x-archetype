import type { ConforamaPlatformResult, ConforamaResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<ConforamaPlatformResult, Partial<ConforamaResult>>({
  description: 'description',
  customLabel1Text: 'customLabel1Text',
  customLabel2Text: 'customLabel2Text',
  customLabel3Text: 'customLabel3Text',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
  brandLogoUrl: 'brandLogoUrl',
  energyIconUrl: 'energyIconUrl',
  discount: 'discountPercentage',
  url: rawResult => rawResult.itemUrl ?? rawResult.__url,
})
