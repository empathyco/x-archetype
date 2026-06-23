import type { Schema } from '@empathyco/x-adapter'
import type { PlatformRecommendationsRequest } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { ParisinaPlatformResult, ParisinaResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

const variantsSchema: Schema<any, any> = {
  originalPrice: 'price',
  specialPrice: 'specialPrice',
  name: 'name',
  attributes: 'attributes',
  image: 'image',
  sku: 'sku',
}

// TODO We should fix this any typing. When we have to map variants, a memory leak error appears in the linter, and we need to use any to avoid it.
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
