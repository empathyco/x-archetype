import type { SanitasPlatformResult, SanitasResult } from '../types'
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<SanitasPlatformResult, Partial<SanitasResult>>({
  description: 'metaDescription',
})
