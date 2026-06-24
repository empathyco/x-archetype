import type { KtuinPlatformResult, KtuinResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<KtuinPlatformResult, Partial<KtuinResult>>({
  eficienciaEnergeticaImage: 'eficienciaEnergeticaImage',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})
