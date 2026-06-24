import type { PlatformFacet, PlatformSemanticQueriesRequest } from '@empathyco/x-adapter-platform'
import type { NumberRangeFacet, Result, SemanticQueriesRequest } from '@empathyco/x-types'

import {
  facetSchema,
  platformAdapter,
  resultSchema,
  semanticQueriesRequestSchema,
} from '@empathyco/x-adapter-platform'
import { getFacetConfigWithEditable } from './facets/utils'
import { platformResultSchema } from './result/platform-result-schema'
import { skuSearchEndpointAdapter } from './skusearch/skusearch.endpoint-adapter'

export const adapter = platformAdapter

/**
 * Code sample about how to extend the result mapper with more fields.
 *
 * We have two result schemas examples (one for VTEX and other for Empathy Platform).
 */
resultSchema.$override<any, Partial<Result>>(platformResultSchema)

semanticQueriesRequestSchema.$override<
  SemanticQueriesRequest,
  Partial<PlatformSemanticQueriesRequest>
>({
  extraParams: ({ extraParams }) => {
    return {
      extraParams,
      filter_ids: 'NOT_ALL_WORDS,NOT_PARTIAL',
    }
  },
})

/**
 * Temporary override of the facet schema to customize the facet type for price facet.
 * It should be removed when the slider facet type is implemented in backend.
 */
facetSchema.$override<PlatformFacet, Partial<NumberRangeFacet>>({
  modelName: ({ type, facet }) =>
    getFacetConfigWithEditable(facet, type).modelName as 'NumberRangeFacet' | undefined,
  filters: {
    $path: 'values',
    $subSchema: ({ type, facet }) => getFacetConfigWithEditable(facet, type).schema,
  },
})

adapter.skuSearch = skuSearchEndpointAdapter
