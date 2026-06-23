import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { SterenResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface SterenPlatformResult extends PlatformResult {
  variants?: any[]
  price: number
  specialPrice?: number
}

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

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
