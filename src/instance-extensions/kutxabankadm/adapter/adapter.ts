import type {
  PlatformNextQueriesRequest,
  PlatformPopularSearchesRequest,
  PlatformQuerySuggestionsRequest,
  PlatformRecommendationsRequest,
  PlatformRelatedTagsRequest,
  PlatformSearchRequest,
} from '@empathyco/x-adapter-platform'
import type {
  NextQueriesRequest,
  PopularSearchesRequest,
  QuerySuggestionsRequest,
  RecommendationsRequest,
  RelatedTagsRequest,
  SearchRequest,
} from '@empathyco/x-types'
import type { KutxabankPlatformResult, KutxabankResult } from '../types'

import {
  nextQueriesRequestSchema,
  platformAdapter,
  popularSearchesRequestSchema,
  querySuggestionsRequestSchema,
  recommendationsRequestSchema,
  relatedTagsRequestSchema,
  resultSchema,
  searchRequestSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

/**
 * Parse the coordenate to use "." instead of ",".
 *
 * @param coordenate - The coordenate to parse.
 * @returns A string with the parsed coordenate.
 */
function parseCoordenate(coordenate: string): string {
  return coordenate.replace(',', '.')
}

/**
 * Maps the result url to be used either linking to an inner page or to a Google's maps url.
 * The "direction" is a unique field that belongs to an office card type,
 * so it's used to distinguish between internal/external links.
 *
 * @param rawResult - The result to map the url from.
 * @returns A string with the product's url.
 */
export function mapUrl(rawResult: KutxabankPlatformResult): string {
  if (rawResult.direccion === '') {
    return rawResult.__url
  }

  const url = new URL('https://www.google.com/maps/search/')
  url.search = new URLSearchParams({
    api: '1',
    query: `${parseCoordenate(rawResult.latitud)},${parseCoordenate(rawResult.longitud)}`,
  }).toString()

  return url.toString()
}

/**
 * Maps the date fields from the raw result to a structured object.
 *
 * @param rawResult - The raw result to map the date from.
 * @returns An array of objects, each containing the start and end dates as strings.
 * Each object in the array corresponds to a date range from the raw result.
 * If the dates are not present in the raw result, it returns an empty array.
 */
export function mapDate(
  rawResult: KutxabankPlatformResult,
): { startDate?: string; endDate?: string }[] {
  const startDate = rawResult.fecha.startDate ?? []
  const endDate = rawResult.fecha.endDate ?? []

  return startDate.map((date, index) => {
    const dateObject: { startDate: string; endDate?: string } = { startDate: date }
    if (endDate[index] && endDate[index] !== '') {
      dateObject.endDate = endDate[index]
    }
    return dateObject
  })
}

resultSchema.$override<KutxabankPlatformResult, Partial<KutxabankResult>>({
  text: 'textoFormat',
  url: result => mapUrl(result),
  address: result => [result.direccion, result.codPostal, result.provincia].join(', '),
  phoneNumber: 'telefono',
  place: 'lugar',
  date: result => mapDate(result),
  store: 'store',
  storeName: 'storeName',
  officeType: 'tipo',
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  extraParams: ({ extraParams }: RecommendationsRequest) => ({
    extraParams: {
      ...extraParams,
      store: ['faq'],
    },
  }),
})

const SEARCH_DEFAULT_EXCLUDE_STORE = [
  'faqbm',
  'faqbmempresas',
  'faqbmparticulares',
  'faqboempresas',
  'faqboparticulares',
] as const

searchRequestSchema.$override<SearchRequest, Partial<PlatformSearchRequest>>({
  extraParams: ({ extraParams, ...rest }) => {
    const store = extraParams?.store ?? ''
    const exclude_store = SEARCH_DEFAULT_EXCLUDE_STORE.filter(id => id !== store)
    return {
      ...rest,
      extraParams: {
        ...extraParams,
        exclude_store,
      },
    }
  },
})

popularSearchesRequestSchema.$override<
  PopularSearchesRequest,
  Partial<PlatformPopularSearchesRequest>
>({
  extraParams: ({ extraParams, ...rest }) => ({
    ...rest,
    extraParams: {
      ...extraParams,
      store: ['pys'],
    },
  }),
})

querySuggestionsRequestSchema.$override<
  QuerySuggestionsRequest,
  Partial<PlatformQuerySuggestionsRequest>
>({
  extraParams: ({ extraParams, ...rest }) => ({
    ...rest,
    extraParams: {
      ...extraParams,
      store: undefined, // Ignore the store param coming from snippet config
    },
  }),
})

relatedTagsRequestSchema.$override<RelatedTagsRequest, Partial<PlatformRelatedTagsRequest>>({
  extraParams: ({ extraParams, ...rest }) => ({
    ...rest,
    extraParams: {
      ...extraParams,
      store: ['faq'],
    },
  }),
})

nextQueriesRequestSchema.$override<NextQueriesRequest, Partial<PlatformNextQueriesRequest>>({
  extraParams: ({ extraParams, ...rest }) => ({
    ...rest,
    extraParams: {
      ...extraParams,
      store: ['faq'],
    },
  }),
})
