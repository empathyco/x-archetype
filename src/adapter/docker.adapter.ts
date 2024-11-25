import {
  searchEndpointAdapter,
  PlatformAdapter,
  nextQueriesEndpointAdapter,
  identifierResultsEndpointAdapter,
  popularSearchesEndpointAdapter,
  recommendationsEndpointAdapter,
  querySuggestionsEndpointAdapter,
  relatedTagsEndpointAdapter,
  semanticQueriesEndpointAdapter,
  experienceControlsEndpointAdapter
} from '@empathyco/x-adapter-platform';
import { XComponentsAdapter } from '@empathyco/x-types';

/**
 * Mutates adapter to point to environment context.
 *
 * @param adapter - PlatformAdapter the adapter to mutate.
 */
export function overrideAdapter(adapter: PlatformAdapter): void {
  adapter.search = searchEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('search', extraParams!)
  });
  adapter.popularSearches = popularSearchesEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('popularSearches', extraParams!)
  });
  adapter.recommendations = recommendationsEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('recommendations', extraParams!)
  });
  adapter.nextQueries = nextQueriesEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('nextQueries', extraParams!)
  });
  adapter.querySuggestions = querySuggestionsEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('querySuggestions', extraParams!)
  });
  adapter.relatedTags = relatedTagsEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('relatedTags', extraParams!)
  });
  adapter.identifierResults = identifierResultsEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('identifierResults', extraParams!)
  });
  adapter.semanticQueries = semanticQueriesEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('semanticQueries', extraParams!)
  });
  adapter.experienceControls = experienceControlsEndpointAdapter.extends({
    endpoint: ({ extraParams }) => resolveEmpathyEndpoint('experienceControls', extraParams!)
  });
}

type DockerEndpoints = Exclude<keyof XComponentsAdapter, 'tagging'>;

/**
 * Function that returns the url for each empathy's endpoints according to the environment context.
 *
 * @param endpoint - The endpoint to resolve the url.
 * @param context - The environment context where to retrieve the information
 * needed to resolve the endpoint.
 *
 * @returns The url for the given endpoint.
 */
function resolveEmpathyEndpoint(endpoint: DockerEndpoints, context: Record<string, any>): string {
  const { empathyAPIHost } = context;
  const endpointHost: string = empathyAPIHost ? empathyAPIHost : 'localhost:8080';
  const endpointInstance = 'imdb';
  const empathyEndpoints: Record<DockerEndpoints, string> = {
    search: `http://${endpointHost}/query/${endpointInstance}/search`,
    popularSearches: `http://${endpointHost}/query/${endpointInstance}/empathize`,
    recommendations: `http://${endpointHost}/query/${endpointInstance}/topclicked`,
    nextQueries: `https://api.empathy.co/nextqueries/${endpointInstance}`,
    querySuggestions: `http://${endpointHost}/query/${endpointInstance}/empathize`,
    relatedPrompts: `https://api.empathy.co/relatedPrompts/${endpointInstance}`,
    relatedTags: `https://api.empathy.co/relatedtags/${endpointInstance}`,
    identifierResults: `http://${endpointHost}/query/${endpointInstance}/skusearch`,
    semanticQueries: `http://${endpointHost}/semantics-api/search_single/${endpointInstance}`,
    experienceControls: `http://${endpointHost}/config/v1/public/configs`
  };
  return empathyEndpoints[endpoint];
}
