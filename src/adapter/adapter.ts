import {
  platformAdapter,
  PlatformRecommendationsRequest,
  PlatformResult,
  recommendationsRequestSchema,
  resultSchema
} from '@empathyco/x-adapter-platform';
import { RecommendationsRequest, Result } from '@empathyco/x-types';

export const adapter = platformAdapter;

/* Code sample about how to extend the result mapper with more fields. */

interface EmpathyDemoPlatformResult extends PlatformResult {
  description: string;
  collection: string;
}

declare module '@empathyco/x-types' {
  export interface Result {
    collection: string;
    description: string;
  }
}

resultSchema.$override<EmpathyDemoPlatformResult, Partial<Result>>({
  description: 'description',
  collection: 'collection',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images])
});

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams
});
