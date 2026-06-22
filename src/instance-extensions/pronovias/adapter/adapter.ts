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

import type { PronoviasResult } from '../types'
import {
  facetSchema,
  platformAdapter,
  recommendationsRequestSchema,
  resultSchema,
} from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

interface PronoviasPlatformResult extends PlatformResult {
  magentoId: string
}

interface PronoviasPlatformFacet extends PlatformFacet {
  label: string
}

resultSchema.$override<PronoviasPlatformResult, Partial<PronoviasResult>>({
  id: rawResult => rawResult.magentoId ?? rawResult.__id,
})

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  // TODO Top clicked demo endpoint breaks if it receives the scope parameter
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})

facetSchema.$override<
  PronoviasPlatformFacet,
  Partial<EditableNumberRangeFacet | HierarchicalFacet | NumberRangeFacet | SimpleFacet>
>({
  label: 'label',
})
