import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { TotalenergiesResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface TotalenergiesPlatformResult extends PlatformResult {
  season: string
  privateUrl: string
  subcategory: string
  description: string
}

resultSchema.$override<TotalenergiesPlatformResult, Partial<TotalenergiesResult>>({
  season: 'season',
  subcategory: 'subcategory',
  description: 'description',
  url: ({ __url, privateUrl }) => privateUrl ?? __url,
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
