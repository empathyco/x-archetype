import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { MiincosmeticsResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface MiincosmeticsPlatformResult extends PlatformResult {
  availability: string
}

resultSchema.$override<MiincosmeticsPlatformResult, Partial<MiincosmeticsResult>>({
  availability: ({ availability }) => availability?.toLowerCase() === 'in_stock',
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
