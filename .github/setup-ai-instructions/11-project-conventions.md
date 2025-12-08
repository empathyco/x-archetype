# Project Conventions

## Feature Flags

**Location**: `src/composables/use-feature-flags.composable.ts`

### Adding a Feature Flag

1. **Add to FeatureFlag enum**:

```typescript
export enum FeatureFlag {
  MY_FEATURE = 'RST-1234-my-feature',
}
```

2. **Configure production status**:

```typescript
export const FEATURE_FLAGS: Record<FeatureFlag, boolean> = {
  [FeatureFlag.MY_FEATURE]: false, // false = dev only, true = prod enabled
}
```

3. **Use in components**:

```typescript
import { useFeatureFlags } from '../../composables/use-feature-flags.composable'

const { isFeatureEnabled } = useFeatureFlags()
const showFeature = isFeatureEnabled(FeatureFlag.MY_FEATURE)
```

### Behavior

- **Non-production environments**: ALL features enabled for testing
- **Production**: Only features with `true` value are enabled
- **Testing**: Use `isFeatureEnabledInProd()` to simulate production behavior

## Internationalization (i18n)

### Message Files

**Location**: `src/i18n/messages/`

Each locale has its own file:

- `en.messages.ts` - English
- `es.messages.ts` - Spanish
- `fr.messages.ts` - French
- etc.

### Message Type Interface

**Location**: `src/i18n/messages.types.ts`

Define typed interface for messages:

```typescript
export interface Messages {
  search: {
    placeholder: string
    button: string
  }
  filters: {
    clear: string
    apply: string
  }
}
```

### Using Messages

```vue
<template>
  <input :placeholder="t('search.placeholder')" />
  <button>{{ t('search.button') }}</button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
```

### Export/Import CSV

> **Note:** Rarely used; for bulk translation handoff only.

```bash
npm run json:csv  # Exports to ./output/*.csv
npm run csv:json  # Imports from ./output/*.csv
```

### Currency Formatting

**Location**: `src/i18n/currencies.ts`

Locale-specific currency formatting:

```typescript
export const currencies = {
  en: {
    symbol: '€',
    position: 'suffix',
    decimalSeparator: '.',
    thousandsSeparator: ',',
  },
  es: {
    symbol: '€',
    position: 'suffix',
    decimalSeparator: ',',
    thousandsSeparator: '.',
  },
}
```

## Code Style

### Component Documentation

**Do NOT create README.md files for individual components** - component usage should be self-documenting through clear prop definitions and JSDoc comments when necessary.

### Vue Block Order

**IMPORTANT**: ESLint enforces `<template>` before `<script>` - all Vue files must follow this order.

### Scoped Styles and Media Queries

**❌ WRONG**: Hardcoded media queries in `<style>` blocks
**✅ CORRECT**: Use Tailwind responsive classes (`mobile:`, `desktop:`) OR `useDevice()` composable for dynamic classes (see Architecture and Common Pitfalls docs)

### Custom Utility Classes

**KISS Principle**: Use default Tailwind classes when possible.

**When to create custom classes**:

- Highly reusable patterns used across 3+ components
- Complex multi-property combinations

**Where to define**:

- **Global utilities**: `src/tailwind/index.css` for app-wide utilities
- **Theme components**: `src/tailwind/plugin-options.ts` for component-specific styles

**❌ WRONG**: Creating one-off custom classes in component `<style>` blocks:

```vue
<style scoped>
.x-line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /* ... */
}
</style>
```

**✅ CORRECT**: Define in global CSS if reusable, otherwise use Tailwind utilities:

```vue
<!-- Use Tailwind's line-clamp plugin -->
<h3 class="x-line-clamp-1">{{ title }}</h3>
```

### Vue Component Pattern

Prefer `<script setup lang="ts">` for new components:

```vue
<template>
  <h2>{{ displayTitle }}</h2>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

const displayTitle = computed(() => `${props.title} (${props.count})`)
</script>
```

### Async Component Loading

Use lazy-loaded components wisely:

```typescript
import { defineAsyncComponent } from 'vue'

const MainModal = defineAsyncComponent(() => import('./custom-main-modal.vue'))
const Results = defineAsyncComponent(() => import('./results/results.vue'))
```

### Device-Specific Components

Separate desktop/mobile implementations in `src/components/desktop/` and `src/components/mobile/`. Use `useDevice()` composable to switch layouts (see Architecture doc for full API).

## File Naming

### Components

- PascalCase for component names: `CustomMainModal`
- kebab-case for file names: `custom-main-modal.vue`

### Utilities

- kebab-case: `facet.utils.ts`, `price.utils.ts`

### Type Definitions

- kebab-case with `.d.ts`: `shims-x-components.d.ts`
- **Why**: TypeScript declaration files use `.d.ts` extension to declare ambient module types and type augmentations. The `shims-*` prefix indicates these files augment external module types (e.g., extending X Components interfaces like `Result`, `XEventsTypes`, or Vue module declarations). These files are global type declarations that don't export/import explicitly.

### Configuration

- kebab-case: `plugin.options.ts`, `device-breakpoints.ts`

## Import Conventions

### Relative Imports

**⚠️ Absolute imports (`@/`) are NOT configured** - use relative paths instead:

```typescript
import { useDevice } from '../../composables/use-device.composable'
import { adapter } from '../../adapter/adapter'
```

### X Components Imports

```typescript
import { XInstaller } from '@empathyco/x-components'
import type { Result, Facet } from '@empathyco/x-types'
import { namespacedWireCommit, filter } from '@empathyco/x-components'
```

## Testing Conventions

### E2E Test Structure

**Location**: `tests/e2e/cucumber/` - `.feature` and `.spec.ts` files must have matching names. Mocked responses in `mocked-responses.spec.ts`.

**Commands**: `npm run cy:open` (interactive), `npm run cy:run` (CI), `npm run test:e2e` (full suite)

## Git Commit Conventions

Follow conventional commits:

```
feat: add price range slider
fix: correct facet filtering bug
docs: update i18n documentation
refactor: extract variant transformation logic
test: add E2E tests for search flow
```
