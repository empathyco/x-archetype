import type { MiincosmeticsPlatformResult, MiincosmeticsResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<MiincosmeticsPlatformResult, Partial<MiincosmeticsResult>>({
  availability: ({ availability }) => availability?.toLowerCase() === 'in_stock',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
