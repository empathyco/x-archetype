import type { JLJPlatformResult, JLJResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<JLJPlatformResult, Partial<JLJResult>>({
  description: 'description',
  brand: 'brand',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
  price: rawResult => {
    const value: number = rawResult.__prices?.current?.value ?? rawResult.price
    const originalValue: number = rawResult.__prices?.previous?.value ?? rawResult.price

    return {
      value,
      originalValue,
      hasDiscount: value < originalValue,
    }
  },
  id: 'id',
  isNew: 'new',
  collection: 'collection',
  isLetter: 'isLetter',
  googleProductCategory: 'googleProductCategory',
})
