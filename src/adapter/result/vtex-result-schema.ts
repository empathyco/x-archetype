import type { Schema } from '@empathyco/x-adapter'
import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'
import type { DeepPartial } from '@empathyco/x-utils'

interface VtexDemoPlatformResult extends PlatformResult {
  __boostId?: string
  brand?: string
  categories?: string[]
  collection?: string
  description?: string
  filerSpecifications?: any
  hasVariants?: boolean
  id?: string
  isActive?: boolean
  isVisible?: boolean
  mainImage?: string
  productId?: string
  score?: number
  textLink?: string
  tradePolicies?: number[]
  variants?: any[]
}

export const vtexResultSchema: DeepPartial<Schema<any, Result>> & Schema<any, Partial<Result>> = {
  boostId: '__boostId',
  brand: 'brand',
  categories: 'categories',
  collection: 'collection',
  description: 'description',
  hasVariants: 'hasVariants',
  id: ({ __id, id }: VtexDemoPlatformResult) => __id ?? id ?? '',
  images: ({ __images }: VtexDemoPlatformResult) => __images ?? [],
  isActive: 'isActive',
  isVisible: 'isVisible',
  mainImage: 'mainImage',
  name: '__name',
  price: ({ __prices }: VtexDemoPlatformResult) => ({
    value: __prices?.current?.value ?? 0,
    originalValue: __prices?.previous?.value ?? __prices?.current?.value ?? 0,
    futureValue: __prices?.future?.value ?? __prices?.current?.value ?? 0,
    hasDiscount:
      (__prices?.current?.value ?? 0) <
      (__prices?.previous?.value ?? __prices?.current?.value ?? 0),
  }),
  productId: 'productId',
  score: 'score',
  textLink: 'textLink',
  tradePolicies: 'tradePolicies',
  url: '__url',
  variants: 'filerSpecifications',
}
