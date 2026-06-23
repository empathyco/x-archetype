import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { JLJResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'
import { mapPrice } from './utils/price.utils'

export const adapter = platformAdapter

export interface JLJPlatformResult extends PlatformResult {
  description: string
  brand: string
  price: number
  id: string
  new: boolean
  collection: string
  isLetter: boolean
  googleProductCategory: string
}

resultSchema.$override<JLJPlatformResult, Partial<JLJResult>>({
  description: 'description',
  brand: 'brand',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
  price: mapPrice,
  id: 'id',
  isNew: 'new',
  collection: 'collection',
  isLetter: 'isLetter',
  googleProductCategory: 'googleProductCategory',
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
