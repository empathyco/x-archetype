import type { ExtraParamsRequest } from '@empathyco/x-types'

/**
 * Gets the Search service URL for the given request.
 *
 * @param from - The request.
 *
 * @returns The service URL.
 *
 * @internal
 */
export function getSearchServiceUrl(from: ExtraParamsRequest): string {
  return from.extraParams?.env === 'test'
    ? 'https://search.internal.test.empathy.co'
    : 'https://api.{extraParams.env(.)}empathy.co/search/v1'
}
