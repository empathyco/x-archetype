import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { MagicpricesResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface MagicpricesPlatformResult extends PlatformResult {
  isDeal: boolean
  hasPromoCode: boolean
}

resultSchema.$override<MagicpricesPlatformResult, Partial<MagicpricesResult>>({
  isDeal: 'isDeal',
  hasPromoCode: 'hasPromoCode',
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
