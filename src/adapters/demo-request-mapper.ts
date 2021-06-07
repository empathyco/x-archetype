import { EmpathySearchRequest, SearchRequest } from '@empathy/search-adapter';

/**
 * This mapper modifies the request to the API.
 *
 * @param rawRequest - This is the raw request that it'll send to the API.
 * @param request - This is the Empathy request handle by the app.
 *
 * @returns A new object which can be handled by XComponents.
 */
export function customRequestMapper(
  rawRequest: SearchRequest,
  request: EmpathySearchRequest
): EmpathySearchRequest {
  return Object.assign(request, {
    query: rawRequest.query
  });
}
