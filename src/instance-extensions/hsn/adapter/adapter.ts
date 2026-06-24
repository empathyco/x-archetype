import type { HsnPlatformResult, HsnResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<HsnPlatformResult, Partial<HsnResult>>({
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
