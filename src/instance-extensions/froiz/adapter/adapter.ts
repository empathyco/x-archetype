import type { PlatformRecommendationsRequest, PlatformResult } from '@empathyco/x-adapter-platform'
import type { RecommendationsRequest } from '@empathyco/x-types'

import type { FroizResult } from '../types'
import {
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface FroizPlatformResult extends PlatformResult {
  isBio: boolean
  isGlutenfree: boolean
  isLactosefree: boolean
  isRefrigerated: boolean
  isEco: boolean
  isFrozen: boolean
  measurementUnit: string
  measurementUnitRatio: number
  offerType?: 'C' | 'I' | '3'
  offerDescription?: string
  offerCode?: string
  fractional?: boolean
  perUnit?: boolean
  perUnitUnit?: string
  perUnitWeight?: number
}

resultSchema.$override<FroizPlatformResult, Partial<FroizResult>>({
  isBio: 'isBio',
  isGlutenfree: 'isGlutenfree',
  isLactosefree: 'isLactosefree',
  isRefrigerated: 'isRefrigerated',
  isEco: 'isEco',
  isFrozen: 'isFrozen',
  measurementUnit: 'measurementUnit',
  measurementUnitRatio: 'measurementUnitRatio',
  offerType: 'offerType',
  offerDescription: 'offerDescription',
  offerCode: 'offerCode',
  offerLink: ({ offerCode }) =>
    offerCode ? `https://supermercado.froiz.com/oferta/${offerCode}` : undefined,
  fractional: 'fractional',
  perUnit: 'perUnit',
  perUnitUnit: 'perUnitUnit',
  perUnitWeight: r => (!r.perUnit && r.fractional ? 0.1 : r.perUnitWeight),
  price: ({ __prices, offerType }) => {
    const currentValue = __prices?.current?.value ?? 0
    const previousValue = __prices?.previous?.value ?? currentValue
    const shouldShowDiscount = offerType === 'C' || offerType === 'I'

    // Prices come wrong in the platform when the offer type is not C or I
    // In those cases, we use the previous price as the actual current price
    return {
      value: shouldShowDiscount ? currentValue : previousValue,
      originalValue: shouldShowDiscount ? previousValue : currentValue,
      futureValue: __prices?.future?.value ?? currentValue,
      hasDiscount: shouldShowDiscount && currentValue < previousValue,
    }
  },
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
