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

import type { ConforamaResult } from '../types'
import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface ConforamaPlatformResult extends PlatformResult {
  description: string
  brandLogoUrl: string
  energyIconUrl: string
  discount: number
  customLabel1Text: string
  customLabel2Text: string
  customLabel3Text: string
  discountPercentage: string
  itemUrl: string
}

interface ConforamaPlatformFacet extends PlatformFacet {
  label: string
}

resultSchema.$override<ConforamaPlatformResult, Partial<ConforamaResult>>({
  description: 'description',
  customLabel1Text: 'customLabel1Text',
  customLabel2Text: 'customLabel2Text',
  customLabel3Text: 'customLabel3Text',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
  brandLogoUrl: 'brandLogoUrl',
  energyIconUrl: 'energyIconUrl',
  discount: 'discountPercentage',
  url: rawResult => rawResult.itemUrl ?? rawResult.__url,
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

facetSchema.$override<
  ConforamaPlatformFacet,
  Partial<EditableNumberRangeFacet | HierarchicalFacet | NumberRangeFacet | SimpleFacet>
>({
  label: 'label',
})
