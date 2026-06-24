import type { DistriplacPlatformResult, DistriplacResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<DistriplacPlatformResult, Partial<DistriplacResult>>({
  description: 'description',
  collection: 'collection',
  brand: 'brand',
  brandImage: 'brandImage',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
