import type { MagicpricesPlatformResult, MagicpricesResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<MagicpricesPlatformResult, Partial<MagicpricesResult>>({
  isDeal: 'isDeal',
  hasPromoCode: 'hasPromoCode',
})
