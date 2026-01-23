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

export const platformResultSchema: DeepPartial<Schema<any, Result>> & Schema<any, Partial<Result>> =
  {
    brand: 'brand',
    collection: 'collection',
    description: 'description',
    hasVariants: ({ variants }: EmpathyDemoPlatformResult): boolean => !!variants?.length,
    images: ({ __images }: EmpathyDemoPlatformResult) =>
      Array.isArray(__images) ? __images.reverse() : [__images],
  }
