import type { Schema } from '@empathyco/x-adapter'
import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'
import type { DeepPartial } from '@empathyco/x-utils'

interface VtexDemoPlatformResult extends PlatformResult {
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

export const vtexResultSchema: DeepPartial<Schema<VtexDemoPlatformResult, Result>> = {
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
  price: ({ __prices }) => ({
    value: __prices?.current?.value ?? 0,
    originalValue: __prices?.previous?.value ?? __prices?.current?.value ?? 0,
    futureValue: __prices?.future?.value ?? __prices?.current?.value ?? 0,
    hasDiscount:
      (__prices?.current?.value ?? 0) <
      (__prices?.previous?.value ?? __prices?.current?.value ?? 0),
  }),
}
