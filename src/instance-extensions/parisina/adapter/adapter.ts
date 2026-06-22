import type { Schema } from '@empathyco/x-adapter'
import type {
  PlatformFacet,
  PlatformRecommendationsRequest,
  PlatformResult,
} from '@empathyco/x-adapter-platform'
import type {
  EditableNumberRangeFacet,
  HierarchicalFacet,
  NumberRangeFacet,
  RecommendationsRequest,
  SimpleFacet,
} from '@empathyco/x-types'

import type { ParisinaResult, ParisinaResultVariant } from '../types'
import {
  facetSchema,
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

interface ParisinaPlatformFacet extends PlatformFacet {
  label: string
}

const variantsSchema: Schema<any, ParisinaResultVariant> = {
  originalPrice: 'price',
  specialPrice: 'specialPrice',
  name: 'name',
  attributes: 'attributes',
  image: 'image',
  sku: 'sku',
}

resultSchema.$override<ParisinaPlatformResult, Partial<ParisinaResult>>({
  sku: 'sku',
  image: 'image',
  attributes: 'attributes',
  specialPrice: 'specialPrice',
  originalPrice: 'price',
  variants: {
    $path: 'variants',
    $subSchema: variantsSchema,
  },
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
  hasVariants: ({ variants }) => !!variants?.length,
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

facetSchema.$override<
  ParisinaPlatformFacet,
  Partial<EditableNumberRangeFacet | HierarchicalFacet | NumberRangeFacet | SimpleFacet>
>({
  label: 'label',
})
