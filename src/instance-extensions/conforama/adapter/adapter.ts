import type { PlatformRecommendationsRequest } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { ConforamaPlatformResult, ConforamaResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

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

// TODO Remove this logic when backend finishes this task https://searchbroker.atlassian.net/browse/ENG-1057
recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
