import type {
  PlatformFacet,
  PlatformRecommendationsRequest,
  PlatformResult,
} from '@empathyco/x-adapter-platform'
import type {
  EditableNumberRangeFacet,
  HierarchicalFacet,
  NumberRangeFacet,
  RecommendationsRequest,
  SimpleFacet,
} from '@empathyco/x-types'

import type { HsnResult } from '../types'
import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface HsnPlatformResult extends PlatformResult {}

interface HsnPlatformResult extends PlatformFacet {
  label: string
}

resultSchema.$override<HsnPlatformResult, Partial<HsnResult>>({
  images: ({ __images }) => (Array.isArray(__images) ? __images.reverse() : [__images]),
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

facetSchema.$override<
  HsnPlatformResult,
  Partial<EditableNumberRangeFacet | HierarchicalFacet | NumberRangeFacet | SimpleFacet>
>({
  label: 'label',
})
