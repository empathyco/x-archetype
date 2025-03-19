import type {
  PlatformRecommendationsRequest,
  PlatformResult,
  PlatformSemanticQueriesRequest,
} from '@empathyco/x-adapter-platform'
import type {
  ExperienceControlsResponse,
  RecommendationsRequest,
  Result,
  SemanticQueriesRequest,
} from '@empathyco/x-types'

import {
  experienceControlsResponseSchema,
  platformAdapter,
  recommendationsRequestSchema,
  relatedPromptsEndpointAdapter,
  resultSchema,
  semanticQueriesRequestSchema,
} from '@empathyco/x-adapter-platform'

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

experienceControlsResponseSchema.$override<
  Partial<ExperienceControlsResponse>,
  Partial<ExperienceControlsResponse>
>({
  controls: ({ controls }) => controls,
  events: {
    SemanticQueriesConfigProvided: {
      maxItemsToRequest: 'controls.semanticQueries.numberOfCarousels',
      resultsPerCarousel: 'controls.semanticQueries.resultsPerCarousels',
    },
  },
})

adapter.relatedPrompts = relatedPromptsEndpointAdapter.extends({
  endpoint:
    'https://api.empathy.co/relatedprompts/mymotivemarketplace?store=Labstore+London&lang=en',
  requestMapper: ({ query }) => ({ query }),
})
