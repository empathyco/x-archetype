import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { MartimotosResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface MartimotosPlatformResult extends PlatformResult {
  stock: number
  discount: number
  discountPercentage: number
}

resultSchema.$override<MartimotosPlatformResult, Partial<MartimotosResult>>({
  stock: 'stock',
  discount: 'discount',
  discountPercentage: 'discountPercentage',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
