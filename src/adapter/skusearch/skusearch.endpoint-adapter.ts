import {
  createMutableSchema,
  endpointAdapterFactory,
  interpolate,
  schemaMapperFactory,
} from '@empathyco/x-adapter'
import { searchResponseMapper } from '@empathyco/x-adapter-platform'
import { getDefaultHeaders, getSearchServiceUrl } from '../utils'

const skuSearchRequestSchema = createMutableSchema<any, any>({
  query: 'query',
  taggingEnabled: 'taggingEnabled',
  returnableFields: 'returnableFields',
  extraParams: 'extraParams',
})

export const skuSearchEndpointAdapter = endpointAdapterFactory({
  endpoint: (from: Record<string, unknown>) =>
    interpolate(`${getSearchServiceUrl(from)}/query/{extraParams.instance}/skusearch`, from),
  requestMapper: schemaMapperFactory(skuSearchRequestSchema),
  responseMapper: searchResponseMapper,
  defaultRequestOptions: {
    id: 'search',
    properties: {
      headers: getDefaultHeaders(),
    },
    parameters: {
      taggingEnabled: false,
    },
  },
})
