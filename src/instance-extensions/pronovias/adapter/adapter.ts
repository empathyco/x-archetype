import type { Result } from '@empathyco/x-types'
import type { PronoviasPlatformResult } from '../types'

import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

export const adapter = platformAdapter

resultSchema.$override<PronoviasPlatformResult, Partial<Result>>({
  id: rawResult => rawResult.magentoId ?? rawResult.__id,
})
