import type {
  PlatformFacet,
  PlatformRecommendationsRequest,
  PlatformResult,
  PlatformSemanticQueriesRequest,
} from '@empathyco/x-adapter-platform'
import type {
  NumberRangeFacet,
  RecommendationsRequest,
  Result,
  SemanticQueriesRequest,
} from '@empathyco/x-types'

import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  relatedPromptsEndpointAdapter,
  resultSchema,
  semanticQueriesRequestSchema,
} from '@empathyco/x-adapter-platform'
import { getFacetConfigWithEditable } from './utils/facet.utils'

export const adapter = platformAdapter

/* Code sample about how to extend the result mapper with more fields. */

interface EmpathyDemoPlatformResult extends PlatformResult {
  description: string
  collection: string
  brand: string
}

declare module '@empathyco/x-types' {
  export interface Result {
    collection: string
    description: string
    brand: string
  }
}

resultSchema.$override<EmpathyDemoPlatformResult, Partial<Result>>({
  description: 'description',
  collection: 'collection',
  brand: 'brand',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

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

adapter.relatedPrompts = relatedPromptsEndpointAdapter.extends({
  endpoint:
    'https://api.empathy.co/relatedprompts/mymotivemarketplace?store=Labstore+London&lang=en',
  requestMapper: ({ query }) => ({ query }),
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
