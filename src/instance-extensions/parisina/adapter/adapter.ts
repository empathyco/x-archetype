import type { Schema } from '@empathyco/x-adapter'
import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { ParisinaResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface ParisinaPlatformResult extends PlatformResult {
  variants?: any[]
  sku: string
  specialPrice?: number
  attributes?: any
  image: string
  price: number
}

const variantsSchema: Schema<any, any> = {
  originalPrice: 'price',
  specialPrice: 'specialPrice',
  name: 'name',
  attributes: 'attributes',
  image: 'image',
  sku: 'sku',
}

resultSchema.$override<any, Partial<ParisinaResult>>({
  sku: 'sku',
  image: 'image',
  attributes: 'attributes',
  specialPrice: 'specialPrice',
  originalPrice: 'price',
  variants: {
    $path: 'variants',
    $subSchema: variantsSchema,
  },
  images: ({ __images }: ParisinaPlatformResult) =>
    Array.isArray(__images) ? __images.reverse() : [__images],
  hasVariants: ({ variants }: ParisinaPlatformResult) => !!variants?.length,
})

// TODO Remove this logic when backend finishes this task https://searchbroker.atlassian.net/browse/ENG-1057
recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
