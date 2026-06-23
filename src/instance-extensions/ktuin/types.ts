import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'

export interface KtuinResult extends Result {
  eficienciaEnergeticaImage: string
}

export interface KtuinPlatformResult extends PlatformResult {
  eficienciaEnergeticaImage: string
}
