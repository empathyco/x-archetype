import type { Schema } from '@empathyco/x-adapter'
import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'

import type { RecommendationsRequest, ResultVariant } from '@empathyco/x-types'
import type { CingolaniResult, CingolaniResultVariant } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  relatedTagsEndpointAdapter,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface CingolaniPlatformResult extends PlatformResult {
  availability?: boolean
  facetBrand?: string
  collection?: string
  description?: string
  image: string
  name: string
  variants?: CingolaniPlatformVariant[]
  isNew?: string
  oxCustom2?: string
  oxCustom3?: string
  oxCustom4?: string
  oxCustom5?: string
  oxCustom6?: string
  productType?: string
  url: string
}

interface CingolaniPlatformVariant {
  availability: boolean
  barCode: string
  currentPrice: number
  facetCurrentPrice: number
  facetSeason: string
  image: string
  link: string
  previousPrice: number
  productType: string
  season: string
  variantSKU: string
  variantValue: string
  variants?: ResultVariant[]
}

const variantsSchema: Schema<any, CingolaniResultVariant> = {
  availability: ({ availability }: CingolaniPlatformVariant) => availability,
  barCode: 'barCode',
  facetCurrentPrice: 'facetCurrentPrice',
  facetSeason: 'facetSeason',
  images: ({ image }: CingolaniPlatformResult) => [image],
  season: 'season',
  url: 'link',
  variantSKU: 'variantSKU',
  variantValue: 'variantValue',
}

resultSchema.$override<any, Partial<CingolaniResult>>({
  id: '__id',
  availability: ({ availability }: CingolaniPlatformResult) => availability === true,
  brand: 'facetBrand',
  collection: 'collection',
  description: 'description',
  hasVariants: ({ variants }: CingolaniPlatformResult): boolean => !!variants?.length,
  images: ({ image }: CingolaniPlatformResult) => [image],
  name: 'name',
  productType: 'productType',
  url: 'url',
  oxCustom2: 'oxCustom2',
  oxCustom3: 'oxCustom3',
  oxCustom4: 'oxCustom4',
  oxCustom5: 'oxCustom5',
  oxCustom6: 'oxCustom6',
  variants: {
    $path: 'variants',
    $subSchema: variantsSchema,
  },
  isNew: ({ isNew }: CingolaniPlatformResult) => isNew === 'Nuovi Arrivi',
})

adapter.relatedTags = relatedTagsEndpointAdapter.extends({
  endpoint: 'https://beacon-api.internal.staging.empathy.co/relatedtags/cingolani/synthetic',
})

// TODO Remove this logic when backend finishes this task https://searchbroker.atlassian.net/browse/ENG-1057
recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
