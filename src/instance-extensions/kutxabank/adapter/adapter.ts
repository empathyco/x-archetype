import type {
  PlatformFacet,
  PlatformNextQueriesRequest,
  PlatformPopularSearchesRequest,
  PlatformQuerySuggestionsRequest,
  PlatformRecommendationsRequest,
  PlatformRelatedTagsRequest,
  PlatformResult,
  PlatformSearchRequest,
} from '@empathyco/x-adapter-platform'
import type {
  EditableNumberRangeFacet,
  HierarchicalFacet,
  NextQueriesRequest,
  NumberRangeFacet,
  PopularSearchesRequest,
  QuerySuggestionsRequest,
  RecommendationsRequest,
  RelatedTagsRequest,
  SearchRequest,
  SimpleFacet,
} from '@empathyco/x-types'
import type { KutxabankResult } from '../types'

import {
  facetSchema,
  nextQueriesRequestSchema,
  platformAdapter,
  popularSearchesRequestSchema,
  querySuggestionsRequestSchema,
  recommendationsRequestSchema,
  relatedTagsRequestSchema,
  resultSchema,
  searchRequestSchema,
} from '@empathyco/x-adapter-platform'
import { mapAdress, mapDate, mapUrl } from './utils/result.utils'

export const adapter = platformAdapter

export interface KutxabankPlatformResult extends PlatformResult {
  latitud: string
  longitud: string
  textoFormat: string
  direccion: string
  codPostal: string
  provincia: string
  telefono: string
  lugar: string
  fecha: {
    startDate: string[]
    endDate: string[]
  }
  store: string
  storeName: string
  tipo: string
}

interface KutxabankPlatformFacet extends PlatformFacet {
  label: string
}

resultSchema.$override<KutxabankPlatformResult, Partial<KutxabankResult>>({
  text: 'textoFormat',
  url: result => mapUrl(result),
  address: result => mapAdress(result),
  phoneNumber: 'telefono',
  place: 'lugar',
  date: result => mapDate(result),
  store: 'store',
  storeName: 'storeName',
  officeType: 'tipo',
})

facetSchema.$override<
  KutxabankPlatformFacet,
  Partial<EditableNumberRangeFacet | HierarchicalFacet | NumberRangeFacet | SimpleFacet>
>({
  label: 'label',
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => ({
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
