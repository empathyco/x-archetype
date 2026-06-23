import type { PlatformFacet, PlatformRecommendationsRequest } from '@empathyco/x-adapter-platform'
import type { NumberRangeFacet, RecommendationsRequest } from '@empathyco/x-types'
import type { AmetllerPlatformResult, AmetllerResult } from '../types'
import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'
import { getFacetConfigWithEditable } from '../../../adapter/facets/utils'

export const adapter = platformAdapter

resultSchema.$override<AmetllerPlatformResult, Partial<AmetllerResult>>({
  bulkPrice: 'bulkPrice',
  images: '__images',
  unitInfo: 'unitInfo',
  measurementUnit: 'measurementUnit',
  clusters: 'clusters',
  maximumQuantity: 'maximumQuantity',
})

// TODO Remove this logic when backend finishes this task https://searchbroker.atlassian.net/browse/ENG-1057
recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

facetSchema.$override<PlatformFacet, Partial<NumberRangeFacet>>({
  modelName: ({ type, facet }) =>
    getFacetConfigWithEditable(facet, type).modelName as 'NumberRangeFacet' | undefined,
  filters: {
    $path: 'values',
    $subSchema: ({ type, facet }) => getFacetConfigWithEditable(facet, type).schema,
  },
})
