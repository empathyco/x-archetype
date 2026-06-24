import type { MartimotosPlatformResult, MartimotosResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<MartimotosPlatformResult, Partial<MartimotosResult>>({
  stock: 'stock',
  discount: 'discount',
  discountPercentage: 'discountPercentage',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
