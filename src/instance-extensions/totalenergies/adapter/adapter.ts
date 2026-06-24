import type { TotalenergiesPlatformResult, TotalenergiesResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<TotalenergiesPlatformResult, Partial<TotalenergiesResult>>({
  season: 'season',
  subcategory: 'subcategory',
  description: 'description',
  url: ({ __url, privateUrl }) => privateUrl ?? __url,
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
