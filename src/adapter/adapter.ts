import type {
  PlatformFacet,
  PlatformRecommendationsRequest,
  PlatformResult,
  PlatformSemanticQueriesRequest,
} from '@empathyco/x-adapter-platform'
import type {
  NumberRangeFacet,
  RecommendationsRequest,
  Result,
  SemanticQueriesRequest,
} from '@empathyco/x-types'

import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  relatedPromptsEndpointAdapter,
  resultSchema,
  semanticQueriesRequestSchema,
} from '@empathyco/x-adapter-platform'
import { getFacetConfigWithEditable } from './facets/utils'
import { skuSearchEndpointAdapter } from './skusearch/skusearch.endpoint-adapter'

export const adapter = platformAdapter

/* Code sample about how to extend the result mapper with more fields. */

interface EmpathyDemoPlatformResult extends PlatformResult {
  brand?: string
  collection?: string
  description?: string
  variants?: any[]
  hasVariants?: boolean
  tradePolicies?: number[]
  score?: number
  mainImage?: string
  isVisible?: boolean
  categories?: string[]
  isActive?: boolean
  textLink?: string
  productId?: string
  __boostId?: string
  id?: string
  filerSpecifications?: any
}

declare module '@empathyco/x-types' {
  export interface Result {
    brand?: string
    collection?: string
    description?: string
    hasVariants?: boolean
    maxSale?: number
    availableQuantity?: number
    isOutOfStock?: boolean
    measurementUnit?: string
    tradePolicies?: number[]
    score?: number
    mainImage?: string
    isVisible?: boolean
    categories?: string[]
    isActive?: boolean
    textLink?: string
    productId?: string
    boostId?: string
  }
}

resultSchema.$override<EmpathyDemoPlatformResult, Partial<Result>>({
  id: rawResult => rawResult.__id ?? rawResult.id,
  name: '__name',
  images: '__images',
  url: '__url',
  description: 'description',
  collection: 'collection',
  brand: 'brand',
  hasVariants: 'hasVariants',
  tradePolicies: 'tradePolicies',
  score: 'score',
  mainImage: 'mainImage',
  isVisible: 'isVisible',
  categories: 'categories',
  isActive: 'isActive',
  textLink: 'textLink',
  productId: 'productId',
  boostId: '__boostId',
  variants: 'filerSpecifications',
  price: ({ __prices }) => {
    if (__prices?.current?.value !== undefined) {
      return {
        value: __prices.current.value,
        originalValue: __prices.previous?.value ?? __prices.current.value,
        futureValue: __prices.future?.value ?? __prices.current.value,
        hasDiscount: __prices.current.value < (__prices.previous?.value ?? __prices.current.value),
      }
    }
    return {
      value: 0,
      originalValue: 0,
      futureValue: 0,
      hasDiscount: false,
    }
  },
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

semanticQueriesRequestSchema.$override<
  SemanticQueriesRequest,
  Partial<PlatformSemanticQueriesRequest>
>({
  extraParams: ({ extraParams }) => {
    return {
      extraParams,
      filter_ids: 'NOT_ALL_WORDS,NOT_PARTIAL',
    }
  },
})

adapter.relatedPrompts = relatedPromptsEndpointAdapter.extends({
  endpoint:
    'https://api.empathy.co/relatedprompts/mymotivemarketplace?store=Labstore+London&lang=en',
  requestMapper: ({ query }) => ({ query }),
})

/**
 * Temporary override of the facet schema to customize the facet type for price facet.
 * It should be removed when the slider facet type is implemented in backend.
 */
facetSchema.$override<PlatformFacet, Partial<NumberRangeFacet>>({
  modelName: ({ type, facet }) =>
    getFacetConfigWithEditable(facet, type).modelName as 'NumberRangeFacet' | undefined,
  filters: {
    $path: 'values',
    $subSchema: ({ type, facet }) => getFacetConfigWithEditable(facet, type).schema,
  },
})

adapter.skuSearch = skuSearchEndpointAdapter
