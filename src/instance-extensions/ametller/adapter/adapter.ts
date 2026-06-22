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
import type { AmetllerResult } from '../types'
import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'
import { getFacetConfigWithEditable } from '../../../adapter/facets/utils'

export const adapter = platformAdapter

interface AmetllerPlatformResult extends PlatformResult {
  bulkPrice: string
  unitInfo: string
  measurementUnit: string
  clusters: string[]
  maximumQuantity: number
}

interface AmetllerPlatformFacet extends PlatformFacet {
  label: string
}

resultSchema.$override<AmetllerPlatformResult, Partial<AmetllerResult>>({
  bulkPrice: 'bulkPrice',
  images: '__images',
  unitInfo: 'unitInfo',
  measurementUnit: 'measurementUnit',
  clusters: 'clusters',
  maximumQuantity: 'maximumQuantity',
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

facetSchema.$override<
  AmetllerPlatformFacet,
  Partial<EditableNumberRangeFacet | HierarchicalFacet | NumberRangeFacet | SimpleFacet>
>({
  label: 'label',
})

facetSchema.$override<PlatformFacet, Partial<NumberRangeFacet>>({
  modelName: ({ type, facet }) =>
    getFacetConfigWithEditable(facet, type).modelName as 'NumberRangeFacet' | undefined,
  filters: {
    $path: 'values',
    $subSchema: ({ type, facet }) => getFacetConfigWithEditable(facet, type).schema,
  },
})
