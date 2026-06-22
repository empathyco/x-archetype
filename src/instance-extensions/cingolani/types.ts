import type { Result, ResultPrice, ResultVariant } from '@empathyco/x-types'

export interface CingolaniResult extends Result {
  availability?: boolean
  brand?: string
  collection?: string
  description?: string
  hasVariants?: boolean
  productType?: string
  variants?: ResultVariant[]
  isNew?: boolean
  oxCustom2?: string
  oxCustom3?: string
  oxCustom4?: string
  oxCustom5?: string
  oxCustom6?: string
  variantSKU?: string
}

export interface CingolaniResultVariant extends ResultVariant {
  availability?: boolean
  barCode?: string
  facetCurrentPrice?: string
  facetSeason?: string
  images?: string[]
  price?: ResultPrice
  season?: string
  url?: string
  variantSKU?: string
  variantValue?: string
}
