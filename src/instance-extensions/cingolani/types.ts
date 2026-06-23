import type { PlatformResult } from '@empathyco/x-adapter-platform'
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

export interface CingolaniPlatformResult extends PlatformResult {
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

export interface CingolaniPlatformVariant {
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
