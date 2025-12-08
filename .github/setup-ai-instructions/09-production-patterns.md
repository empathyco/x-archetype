# Production Patterns from Archetypal Repositories

> Based on analysis of 17+ production implementations, these patterns are commonly used across the ecosystem.

## Proven Patterns

### 1. Query Filtering with :: Prefix

Special commands prefixed with `::` bypass normal search flow for testing/debugging:

```typescript
// src/x-components/wiring/search.wiring.ts
import { filter, namespacedWireCommit } from '@empathyco/x-components'

const wireCommit = namespacedWireCommit('search')
const setSearchQuery = wireCommit('setQuery')

// Filter :: commands from being added to history or URL
export const setSearchQueryFiltered = filter(
  setSearchQuery,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)
```

**Use case**: Internal testing commands, debugging queries, or admin functions that shouldn't pollute user history.

**Wiring configuration**:

```typescript
// src/x-components/plugin.options.ts
search: {
  wiring: {
    UserAcceptedAQuery: {
      setSearchQueryFiltered,  // Instead of default setSearchQuery
    }
  }
}
```

### 2. Semantic Chunk Naming for Analytics

Production repos use meaningful chunk names for tracking bundle loads:

```typescript
// rollup.config.mjs
export default createConfig({
  output: {
    chunkFileNames: chunkInfo => {
      switch (chunkInfo.name) {
        case 'custom-main-modal':
          return 'x-empty-search-[hash].js' // Track empty search modal loads
        case 'index':
          return 'x-search-[hash].js' // Track main search bundle
        default:
          return '[name].[hash].js'
      }
    },
  },
})
```

**Use case**: Analytics platforms can track which features are actually loaded by users.

### 3. Editable Price Range Facet

Complex custom facet that reads from URL parameters:

```typescript
// src/adapter/adapter.ts
import { getFacetConfig } from './utils/facet.utils'

const getFacetConfigWithEditable = (facetId: string, type: PlatformFacetType) => {
  if (facetId === 'price') {
    const config = getFacetConfig('editable-range')
    // Override schema to read from URL filter parameters
    config.schema = {
      min: 'filter.price:gte',
      max: 'filter.price:lte',
      // Custom range extraction logic
    }
    return config
  }
  return getFacetConfig(type)
}
```

**Use case**: Allows users to manually input price ranges instead of only selecting from predefined ranges.

### 4. Disabling Unwanted Default Tracking

Some implementations disable specific tracking wires:

```typescript
// src/x-components/plugin.options.ts
tagging: {
  wiring: {
    RelatedPromptsResponseChanged: {
      trackNoResultsQueryWithFallbackWireDebounced: undefined,  // Disable
    },
    SemanticQueriesResponseChanged: {
      trackNoResultsQueryWithFallbackWireDebounced: undefined,  // Disable
    }
  }
}
```

**⚠️ Use sparingly**: Understand why default tracking exists before disabling. This pattern is used when:

- Related prompts/semantic queries shouldn't trigger no-results tracking
- Custom tracking logic replaces default behavior
- Analytics requirements differ from X Components defaults

### 5. Extended Result Schema for E-commerce

Production implementations extend Result with platform-specific fields:

```typescript
// src/shims-x-components.d.ts
declare module '@empathyco/x-types' {
  export interface Result {
    // Variant handling
    variantAttributeId: number
    variantOptionId: number
    productId: string
    sku: string

    // Inventory
    hasStock: boolean

    // Product metadata
    brand: string
    discountPct: string

    // Criteo/sponsored fields
    isSponsored: boolean
    onClickBeacon: string
    onViewBeacon: string
  }
}
```

**Adapter schema override**:

```typescript
// src/adapter/adapter.ts
resultSchema.$override<Result>({
  brand: 'brand',
  discountPct: 'discount_pct',
  isSponsored: 'is_sponsored',
  onClickBeacon: 'on_click_beacon',
  onViewBeacon: 'on_view_beacon',
})
```

**Use case**: Maps platform-specific fields to typed Result interface for type-safe component access.

## Integration Points

### Window API Extensions

Custom `window.wysiwyg` API for external integration:

```typescript
// src/main.ts
window.wysiwyg = {
  open: () => {
    /* Show search interface */
  },
  setContext: context => {
    /* Update search context */
  },
  goToLogin: () => {
    /* Redirect to login */
  },
}
```

**Use case**: External WYSIWYG tools or CMS integrations can control search interface.

### Event-Driven Communication

X Components event bus for external systems:

```typescript
// Subscribe to search events
x.on('UserAcceptedAQuery').subscribe(query => {
  // Send to analytics
})

x.on('SearchResponseChanged').subscribe(response => {
  // Update external context with spellcheck
})

x.on('ParamsLoadedFromUrl').subscribe(() => {
  // Trigger search from URL params
})
```
