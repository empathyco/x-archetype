import {
  platformAdapter,
  PlatformRecommendationsRequest,
  PlatformResult,
  recommendationsRequestSchema,
  resultSchema,
  semanticQueriesEndpointAdapter
} from '@empathyco/x-adapter-platform';
import { RecommendationsRequest, Result } from '@empathyco/x-types';

export const adapter = platformAdapter;

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

// Provisional endpoint
// TODO: Remove this once the endpoint is deployed to the Empathy API.
platformAdapter.semanticQueries = semanticQueriesEndpointAdapter.extends({
  endpoint: 'https://semantics-api.internal.staging.empathy.co/search_single/{extraParams.instance}'
});
