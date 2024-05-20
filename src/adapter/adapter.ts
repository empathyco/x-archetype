import { interpolate } from '@empathyco/x-adapter';
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
  ExtraParamsRequest,
  RecommendationsRequest,
  Result,
  SemanticQueriesRequest
} from '@empathyco/x-types';

// TODO Manage Platform Test URLs at @empathyco/x-adapter-platform level to avoid these extends:
// https://github.com/empathyco/x/pull/1477

/**
 * Gets the Search service URL for the given request.
 *
 * @param from - The request.
 *
 * @returns The service URL.
 *
 * @internal
 */
function getSearchServiceUrl(from: ExtraParamsRequest): string {
  return from.extraParams?.env === 'test'
    ? 'https://search.internal.test.empathy.co'
    : 'https://api.{extraParams.env(.)}empathy.co/search/v1';
}

/**
 * Gets the Beacon service URL for the given request.
 *
 * @param from - The request.
 *
 * @returns The service URL.
 *
 * @internal
 */
function getBeaconServiceUrl(from: ExtraParamsRequest): string {
  return from.extraParams?.env === 'test'
    ? 'https://beacon-api.internal.test.empathy.co'
    : 'https://api.{extraParams.env(.)}empathy.co';
}

/**
 * Gets the Semantics service URL for the given request.
 *
 * @param from - The request.
 *
 * @returns The service URL.
 *
 * @internal
 */
function getSemanticsServiceUrl(from: ExtraParamsRequest): string {
  return from.extraParams?.env === 'test'
    ? 'https://semantics-api.internal.test.empathy.co'
    : 'https://api.{extraParams.env(.)}empathy.co/semantics-api';
}

/**
 * Gets the Config service URL for the given request.
 *
 * @param from - The request.
 *
 * @returns The service URL.
 *
 * @internal
 */
function getConfigServiceUrl(from: ExtraParamsRequest): string {
  return from.extraParams?.env === 'test'
    ? 'https://config-service.internal.test.empathy.co'
    : 'https://api.{extraParams.env(.)}empathy.co/config/v1';
}

const searchEndpointAdapter = platformAdapter.search.extends({
  endpoint: from =>
    interpolate(`${getSearchServiceUrl(from)}/query/{extraParams.instance}/search`, from)
});
platformAdapter.search = searchEndpointAdapter;

const popularSearchesEndpointAdapter = platformAdapter.popularSearches.extends({
  endpoint: from =>
    interpolate(`${getSearchServiceUrl(from)}/query/{extraParams.instance}/empathize`, from)
});
platformAdapter.popularSearches = popularSearchesEndpointAdapter;

const recommendationsEndpointAdapter = platformAdapter.recommendations.extends({
  endpoint: from =>
    interpolate(`${getSearchServiceUrl(from)}/query/{extraParams.instance}/topclicked`, from)
});
platformAdapter.recommendations = recommendationsEndpointAdapter;

const nextQueriesEndpointAdapter = platformAdapter.nextQueries.extends({
  endpoint: from =>
    interpolate(`${getBeaconServiceUrl(from)}/nextqueries/{extraParams.instance}`, from)
});
platformAdapter.nextQueries = nextQueriesEndpointAdapter;

const querySuggestionsEndpointAdapter = platformAdapter.querySuggestions.extends({
  endpoint: from =>
    interpolate(`${getSearchServiceUrl(from)}/query/{extraParams.instance}/empathize`, from)
});
platformAdapter.querySuggestions = querySuggestionsEndpointAdapter;

const relatedTagsEndpointAdapter = platformAdapter.relatedTags.extends({
  endpoint: from =>
    interpolate(`${getBeaconServiceUrl(from)}/relatedtags/{extraParams.instance}`, from)
});
platformAdapter.relatedTags = relatedTagsEndpointAdapter;

const identifierResultsEndpointAdapter = platformAdapter.identifierResults.extends({
  endpoint: from =>
    interpolate(`${getSearchServiceUrl(from)}/query/{extraParams.instance}/skusearch`, from)
});
platformAdapter.identifierResults = identifierResultsEndpointAdapter;

const semanticQueriesEndpointAdapter = platformAdapter.semanticQueries.extends({
  endpoint: from =>
    interpolate(`${getSemanticsServiceUrl(from)}/search_single/{extraParams.instance}`, from)
});
platformAdapter.semanticQueries = semanticQueriesEndpointAdapter;

const experienceControlsEndpointAdapter = platformAdapter.experienceControls.extends({
  endpoint: from => interpolate(`${getConfigServiceUrl(from)}/public/configs`, from)
});
platformAdapter.experienceControls = experienceControlsEndpointAdapter;

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
