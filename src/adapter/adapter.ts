import {
  platformAdapter,
  PlatformRecommendationsRequest,
  PlatformSemanticQueriesRequest,
  PlatformResult,
  recommendationsRequestSchema,
  resultSchema,
  semanticQueriesRequestSchema,
  experienceControlsResponseSchema
} from '@empathyco/x-adapter-platform';
import {
  ExperienceControlsResponse,
  RecommendationsRequest,
  Result,
  SemanticQueriesRequest
} from '@empathyco/x-types';

export const adapter = {
  search: {
    ...platformAdapter.search,
    defaultRequestOptions: {
      ...(platformAdapter.search as any).defaultRequestOptions,
      properties: {
        ...(platformAdapter.search as any).defaultRequestOptions.properties,
        cache: 'force-cache'
      }
    }
  },
  relatedTags: {
    ...platformAdapter.relatedTags,
    defaultRequestOptions: {
      ...(platformAdapter.relatedTags as any).defaultRequestOptions,
      properties: {
        ...(platformAdapter.relatedTags as any).defaultRequestOptions.properties,
        cache: 'force-cache'
      }
    }
  },
  nextQueries: {
    ...platformAdapter.nextQueries,
    defaultRequestOptions: {
      ...(platformAdapter.nextQueries as any).defaultRequestOptions,
      properties: {
        ...(platformAdapter.nextQueries as any).defaultRequestOptions.properties,
        cache: 'force-cache'
      }
    }
  }
};

/* Code sample about how to extend the result mapper with more fields. */

interface EmpathyDemoPlatformResult extends PlatformResult {
  description: string;
  collection: string;
  brand: string;
}

declare module '@empathyco/x-types' {
  export interface Result {
    collection: string;
    description: string;
    brand: string;
  }
}

resultSchema.$override<EmpathyDemoPlatformResult, Partial<Result>>({
  description: 'description',
  collection: 'collection',
  brand: 'brand',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images])
});

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams
});

semanticQueriesRequestSchema.$override<
  SemanticQueriesRequest,
  Partial<PlatformSemanticQueriesRequest>
>({
  extraParams: ({ extraParams }) => {
    return {
      extraParams,
      filter_ids: 'NOT_ALL_WORDS,NOT_PARTIAL'
    };
  }
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
experienceControlsResponseSchema.$override<
  Partial<ExperienceControlsResponse>,
  Partial<ExperienceControlsResponse>
>({
  controls: ({ controls }) => controls,
  events: {
    SemanticQueriesConfigProvided: {
      maxItemsToRequest: 'controls.semanticQueries.numberOfCarousels',
      resultsPerCarousel: 'controls.semanticQueries.resultsPerCarousels'
    }
  }
});
