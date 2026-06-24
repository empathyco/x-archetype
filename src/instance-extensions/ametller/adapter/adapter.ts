import type { PlatformFacet } from '@empathyco/x-adapter-platform'
import type { NumberRangeFacet } from '@empathyco/x-types'
import type { AmetllerPlatformResult, AmetllerResult } from '../types'
import { facetSchema, platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'
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

facetSchema.$override<PlatformFacet, Partial<NumberRangeFacet>>({
  modelName: ({ type, facet }) =>
    getFacetConfigWithEditable(facet, type).modelName as 'NumberRangeFacet' | undefined,
  filters: {
    $path: 'values',
    $subSchema: ({ type, facet }) => getFacetConfigWithEditable(facet, type).schema,
  },
})
