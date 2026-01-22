import type { Schema } from '@empathyco/x-adapter'
import type { PlatformResult } from '@empathyco/x-adapter-platform'
import type { Result } from '@empathyco/x-types'
import type { DeepPartial } from '@empathyco/x-utils'

interface EmpathyDemoPlatformResult extends PlatformResult {
  brand?: string
  collection?: string
  description?: string
  variants?: any[]
}

export const platformResultSchema: DeepPartial<Schema<EmpathyDemoPlatformResult, Result>> = {
  description: 'description',
  collection: 'collection',
  brand: 'brand',
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
  hasVariants: ({ variants }): boolean => !!variants?.length,
}
