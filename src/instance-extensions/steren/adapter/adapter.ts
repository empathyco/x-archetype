import type { PlatformRecommendationsRequest } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { SterenPlatformResult, SterenResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<SterenPlatformResult, Partial<SterenResult>>({
  hasVariants: ({ variants }) => !!variants?.length,
  price: rawResult => {
    const value = rawResult.specialPrice ?? rawResult.price ?? 0
    const originalValue = rawResult.price ?? 0
    const futureValue = rawResult.__prices?.future?.value ?? value

    return {
      value,
      originalValue,
      futureValue,
      hasDiscount: originalValue > value,
    }
  },
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
