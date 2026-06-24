import type { SterenPlatformResult, SterenResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<SterenPlatformResult, Partial<SterenResult>>({
  hasVariants: ({ variants }) => !!variants?.length,
  price: rawResult => {
    const value = rawResult.specialPrice ?? rawResult.price ?? 0
    const originalValue = rawResult.price ?? 0
    const futureValue = rawResult.__prices?.future?.value ?? value

    return {
      value,
      originalValue,
      futureValue,
      hasDiscount: originalValue > value,
    }
  },
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
