import type { PlatformRecommendationsRequest } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { MartimotosPlatformResult, MartimotosResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<MartimotosPlatformResult, Partial<MartimotosResult>>({
  stock: 'stock',
  discount: 'discount',
  discountPercentage: 'discountPercentage',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})

// TODO Remove this logic when backend finishes this task https://searchbroker.atlassian.net/browse/ENG-1057
recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
