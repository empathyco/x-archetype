import type { Schema } from '@empathyco/x-adapter'

import type {
  CingolaniPlatformResult,
  CingolaniPlatformVariant,
  CingolaniResult,
  CingolaniResultVariant,
} from '../types'
import {
  platformAdapter,
  relatedTagsEndpointAdapter,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

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

// TODO We should fix this any typing. When we have to map variants, a memory leak error appears in the linter, and we need to use any to avoid it.
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
