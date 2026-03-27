# Vue & TypeScript Conventions

## Vue 3 Patterns

### Component Block Order

**ESLint enforces this order** - `<template>` must come before `<script setup lang="ts">`:

```vue
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// Script content
</script>
```

### Component Script Style

- **Prefer**: `<script setup lang="ts">` for new components (Composition API)
- **Legacy**: `defineComponent()` with Options API only for existing components in:
  - `src/components/teleport/`
  - `src/components/search/results/next-queries-*.vue`

### Async Component Loading

Lazy-load large components: `defineAsyncComponent(() => import('./path'))`

### Device-Specific Components

Separate components for different devices in `src/components/mobile/` and `src/components/desktop/`. Use `useDevice()` composable (see Architecture doc for full API) - common pattern: `isTabletOrGreater` for tablet + desktop together.

## TypeScript Conventions

### Type Extensions

Type extensions **MUST** be declared in `src/shims-*.d.ts` files, never inline in components.

#### X Components Types

Extend in `src/shims-x-components.d.ts`:

```typescript
declare module '@empathyco/x-components' {
  export interface SnippetConfig {
    // Add custom snippet config properties
    customProperty?: string
  }

  export interface XEventsTypes {
    // Add custom event types
    MyCustomEvent: string
  }
}
```

#### Result Interface Extensions

Extend in `src/shims-x-components.d.ts` and override schema in `adapter.ts`:

```typescript
declare module '@empathyco/x-types' {
  export interface Result {
    // Add custom result properties
    variantAttributeId: number
    productId: string
    sku: string
    hasStock: boolean
  }
}
```

Then in `src/adapter/adapter.ts`:

```typescript
resultSchema.$override<any, any>({
  hasStock: ({ availability }) => availability !== 'false',
  productId: 'productId',
  sku: 'sku',
})
```

#### Vue Module Declarations

Extend in `src/shims-vue.d.ts` for `.vue` module declarations.

### Schema Override Order

**CRITICAL**: Override schemas AFTER importing base adapter:

```typescript
// ❌ WRONG
const customSchema = {
  /* ... */
}
import { platformAdapter } from '@empathyco/x-adapter-platform'

// ✅ CORRECT
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'
resultSchema.$override<any, any>({
  /* ... */
})
```

## State Access Patterns

### X Components State

- **Reactive getters**: `const x = use$x()`
  - Access: `x.query.searchBox`, `x.results`, `x.totalResults`
- **Module state**: `const { relatedPrompts } = useState('relatedPrompts')`
- **Computed state**: Always use computed when deriving values:
  ```typescript
  const showNoResults = computed(() => !x.relatedPrompts.length && !x.semanticQueries.length)
  ```

### Vuex Store

Minimal usage - `src/store/index.ts` only for app-specific state not managed by X Components.
