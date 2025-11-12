# X Components Integration

## X Module Configuration

X modules are configured in `src/x-components/plugin.options.ts` via the `xModules` object.

### Common Module Configurations

#### Facets Module

```typescript
xModules: {
  facets: {
    config: {
      filtersStrategyForRequest: 'leaves-only',
    },
  },
}
```

#### Semantic Queries Module

```typescript
xModules: {
  semanticQueries: {
    config: {
      threshold: 50,
      maxItemsToRequest: 10,
    },
  },
}
```

## Custom Wiring Patterns

Custom event handlers go in `src/x-components/wiring/` - **this is a common pattern for customizing X Components behavior**.

### Creating Custom Wires

```typescript
// src/x-components/wiring/my-module.wiring.ts
import { namespacedWireCommit } from '@empathyco/x-components'

const wireCommit = namespacedWireCommit('moduleName')
export const myCustomWire = wireCommit('mutationName')
```

### Applying Custom Wires

```typescript
// src/x-components/plugin.options.ts
xModules: {
  moduleName: {
    wiring: {
      EventName: {
        myCustomWire
      }
    }
  }
}
```

### Common Wiring Scenarios

1. **Filtering events before they trigger**

   ```typescript
   const setSearchQueryFiltered = filter(
     setSearchQuery,
     ({ eventPayload }) => !eventPayload.startsWith('::'),
   )
   ```

2. **Custom state mutations on specific events**
   - Merge semantic queries configuration
   - Update URL parameters on query changes
   - Track specific user interactions

3. **Coordinating behavior across multiple X modules**
   - Disable default tracking for specific modules
   - Synchronize state between search and history modules

## Adapter Schema Overrides

### Result Schema Extensions

Extend the Result interface in `src/shims-x-components.d.ts`:

```typescript
declare module '@empathyco/x-types' {
  export interface Result {
    variantAttributeId: number
    productId: string
    sku: string
    hasStock: boolean
  }
}
```

Then override the schema in `src/adapter/adapter.ts`:

```typescript
import { resultSchema } from '@empathyco/x-adapter-platform'

resultSchema.$override<any, any>({
  hasStock: ({ availability }) => availability !== 'false',
  productId: 'productId',
  sku: 'sku',
})
```

### Facet Schema Overrides

Custom facet configurations (e.g., editable price range):

```typescript
const getFacetConfigWithEditable = (facetId: string, type: PlatformFacetType) => {
  if (facetId === 'price') {
    const config = getFacetConfig('editable-range')
    config.schema = {
      /* custom range extraction logic */
    }
    return config
  }
  return getFacetConfig(type)
}

facetSchema.$override<PlatformFacet, Partial<NumberRangeFacet>>({
  modelName: ({ type, facet }) => getFacetConfigWithEditable(facet, type).modelName,
  filters: {
    $path: 'values',
    $subSchema: ({ type, facet }) => getFacetConfigWithEditable(facet, type).schema,
  },
})
```

### Request Schema Overrides

Override request schemas to customize API parameters:

```typescript
import { recommendationsRequestSchema } from '@empathyco/x-adapter-platform'

recommendationsRequestSchema.$override<
  RecommendationsRequest,
  Partial<PlatformRecommendationsRequest>
>({
  extraParams: ({ extraParams: { scope, ...extraParams } = {} }) => extraParams,
})
```

## Common Integration Patterns

### Query Filtering with :: Prefix

Special commands prefixed with `::` bypass normal search flow:

```typescript
const setSearchQueryFiltered = filter(
  setSearchQuery,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)

const addQueryToHistoryQueriesFiltered = filter(
  addQueryToHistoryQueries,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)

const setUrlQueryFiltered = filter(
  setUrlQuery,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)
```

### Disabling Default Tracking

```typescript
xModules: {
  tagging: {
    wiring: {
      RelatedPromptsResponseChanged: {
        trackNoResultsQueryWithFallbackWireDebounced: undefined,
      },
      SemanticQueriesResponseChanged: {
        trackNoResultsQueryWithFallbackWireDebounced: undefined,
      }
    }
  }
}
```

⚠️ **Use sparingly** - understand why default tracking exists before disabling.
