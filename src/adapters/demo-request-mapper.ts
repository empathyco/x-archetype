import { EmpathySearchRequest, SearchRequest } from '@empathy/search-adapter';

/**
 * This mapper modifies the request sent to the API.
 *
 * @param rawRequest - The initial
 * {@link @empathy/search-adapter#SearchRequest | SearchRequest} object without
 * any modification.
 * @param request - The {@link @empathy/search-adapter#EmpathySearchRequest |
 * empathy's search request object} with the changes done in previous hooks or
 * mappers.
 *
 * @returns A new {@link @empathy/search-adapter#EmpathySearchRequest |
 * empathy's search request object}.
 */
export function customRequestMapper(
  rawRequest: SearchRequest,
  request: EmpathySearchRequest
): EmpathySearchRequest {
  return Object.assign(request, {
    query: rawRequest.query
  });
}
