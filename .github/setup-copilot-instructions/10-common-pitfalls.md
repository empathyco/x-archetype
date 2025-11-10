# Common Pitfalls

> Frequent mistakes that cause issues - be aware of them when coding.

## 🚨 CRITICAL: Recreating Existing X Tailwind Components

**This is the #1 most wasteful error - recreating components that already exist in X Tailwind.**

### ❌ WRONG - Recreating X Tailwind components

```typescript
// DON'T DO THIS - X Tailwind already provides .x-tag
components: ({ theme }) => ({
  '.x-custom-tag': {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: '4px',
    // ... 50+ lines recreating what already exists
  },
})
```

### ✅ CORRECT - Use existing + minimal overrides

```typescript
// GOOD - Use existing X Tailwind components + minimal brand overrides
components: ({ theme }) => ({
  '.x-tag.x-selected': {
    backgroundColor: theme('x.colors.lead.50'), // MartiMotos red
    color: theme('x.colors.neutral.0'), // White text
  },
})

// In components:
<tag class="x-tag x-tag-lead x-tag-md x-font-bold">
```

**Always check first**: `grep -r "x-component-name" node_modules/@empathyco/x-tailwindcss/dist/`

## 🚨 CRITICAL: Device Breakpoints Synchronization

**This is the #1 most common error that breaks responsive behavior across the entire application.**

The app uses **TWO systems** that must stay synchronized:

1. **`src/device-breakpoints.ts`** → Controls Vue component logic via `useDevice()` composable
2. **`tailwind.config.ts`** (or `src/tailwind/plugin-options.ts`) → Generates responsive CSS classes

### These MUST have matching values

```typescript
// src/device-breakpoints.ts
export const deviceBreakpoints = {
  mobile: 0,
  tablet: 744,
  desktop: 1280,
}

// tailwind.config.ts or src/tailwind/plugin-options.ts
theme: {
  extend: {
    screens: plugin => plugin.theme('x.screens') // Should map to same values
  }
}
```

### ❌ WRONG - Mismatched breakpoints break responsive system

```typescript
// device-breakpoints.ts has desktop: 1280
// but tailwind config has:
theme: {
  extend: {
    x: theme => ({
      screens: {
        desktop: '992px', // CRITICAL ERROR - doesn't match device-breakpoints.ts
      },
    })
  }
}
```

### ✅ CORRECT - Keep defaults or sync both files

```typescript
// Option 1: Use X Tailwind defaults (recommended)
theme: {
  extend: {
    x: (theme) => ({
      colors: { /* ... */ },
      fontFamily: { /* ... */ },
      // NO screens override - uses default from X Tailwind
    }),
    screens: plugin => plugin.theme('x.screens')
  }
}

// Option 2: If you MUST customize, sync BOTH files
// device-breakpoints.ts: { mobile: 0, tablet: 768, desktop: 1024 }
// tailwind config:
theme: {
  extend: {
    x: (theme) => ({
      screens: {
        tablet: '768px',   // Matches device-breakpoints.ts
        desktop: '1024px', // Matches device-breakpoints.ts
      }
    })
  }
}
```

### Why this matters

- `device-breakpoints.ts` controls `isMobile`, `isTablet`, `isDesktop` detection
- Tailwind generates CSS classes: `desktop:x-hidden`, `tablet:x-flex`, etc.
- If values don't match: CSS shows desktop layout but Vue thinks it's mobile (or vice versa)
- Desktop/mobile component switching, sliding panels, modals all break

## Type System Issues

### Module Augmentation

Always declare type extensions in `src/shims-*.d.ts` files, never inline:

❌ **Wrong**: Extending `Result` interface in component files

```typescript
// Inside a component file - BAD
declare module '@empathyco/x-types' {
  export interface Result {
    customField: string
  }
}
```

✅ **Correct**: Extend in `src/shims-x-components.d.ts`

```typescript
// src/shims-x-components.d.ts
declare module '@empathyco/x-types' {
  export interface Result {
    customField: string
  }
}
```

Then override schema in `adapter.ts`:

```typescript
resultSchema.$override<Result>({
  customField: 'custom_field',
})
```

### Adapter Schema Order

Override schemas AFTER importing base adapter:

❌ **Wrong**: Defining schema overrides before import

```typescript
// BAD - overrides won't work
resultSchema.$override<Result>({...})
import { platformAdapter } from '@empathyco/x-adapter-platform'
```

✅ **Correct**: Import first, then override

```typescript
import { platformAdapter, resultSchema } from '@empathyco/x-adapter-platform'

resultSchema.$override<Result>({
  customField: 'custom_field',
})
```

## Tailwind CSS Issues

### Missing x- Prefix

Don't forget `x-` prefix on ALL custom classes:

❌ **Wrong**:

```vue
<div class="text-red-500 bg-white"></div>
```

✅ **Correct**:

```vue
<div class="x-bg-white x-text-red-500"></div>
```

### Ignoring Design System

Always use X Tailwind design tokens before creating custom values:

❌ **Wrong**: Creating custom colors

```typescript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // Arbitrary blue
    }
  }
}
```

✅ **Correct**: Using design system

```vue
<button class="x-bg-lead-50 x-text-neutral-10">
  <!-- Uses semantic colors from X Tailwind -->
</button>
```

### ⚠️ Hardcoded Color Values (Anti-pattern from production)

❌ **Anti-pattern**: Overriding semantic colors with arbitrary hex values

```typescript
// BAD - creates maintenance burden
x: theme => ({
  colors: {
    neutral: {
      71: '#5D677E', // no named color in figma - RED FLAG!
    },
  },
})
```

✅ **Correct**: Use semantic color names

```typescript
x: theme => ({
  colors: {
    lead: {
      50: '#C62D2D', // Map brand primary to semantic lead-50
      75: '#a72626',
    },
    neutral: {
      // Use complete semantic palette, not arbitrary values
      10: '#F4F3F1',
      90: '#454545',
    },
  },
})
```

### ⚠️ Typography Overrides Without Justification

❌ **Anti-pattern**: Overriding with arbitrary values

```typescript
// BAD - breaks responsive typography
fontSize: {
  xs: '12px',  // Hardcoded instead of using design system scale
  s: '14px',
  m: '16px',
}
```

✅ **Correct**: Only override if Figma differs significantly

```typescript
// GOOD - Only override what's necessary
x: theme => ({
  fontFamily: {
    main: "'Open Sans', sans-serif", // Brand font is valid override
  },
  // Use default fontSize/lineHeight/fontWeight unless required
})
```

## Adapter Schema Issues

### Complex Variant Logic

⚠️ **Warning**: Over-complex schemas found in production (70+ lines of variant logic)

Consider extracting variant transformation logic to separate utility functions:

```typescript
// src/adapter/utils/variant.utils.ts
export function transformVariants(rawData: unknown): VariantData {
  // Complex transformation logic here
}

// src/adapter/adapter.ts
resultSchema.$override<Result>({
  variants: result => transformVariants(result.raw_variants),
})
```

## Component Issues

### Component Documentation

❌ **Wrong**: Creating README.md files for individual components

```
src/components/
  my-component/
    my-component.vue
    README.md  // DON'T DO THIS
```

✅ **Correct**: Self-documenting components with clear prop definitions

```vue
<script setup lang="ts">
interface Props {
  /** The title to display */
  title: string
  /** Number of items to show */
  count?: number
}
</script>
```

### Hardcoded Media Queries

❌ **Wrong**: Using hardcoded breakpoints in scoped styles

```vue
<style scoped>
/* BAD - doesn't match device-breakpoints.ts */
@media (max-width: 743px) {
  .x-result-item {
    flex-direction: row;
  }
}
</style>
```

✅ **Correct**: Use Tailwind responsive classes OR `useDevice()` composable for dynamic classes

**Option 1: Tailwind responsive classes**

```vue
<template>
  <div class="x-flex mobile:x-flex-col desktop:x-grid desktop:x-grid-cols-4">
</template>
```

**Option 2: Dynamic classes with useDevice()**

```vue
<template>
  <div class="x-flex" :class="{ 'x-grid x-grid-cols-4': isTabletOrGreater }">
</template>

<script setup lang="ts">
import { useDevice } from '../../composables/use-device.composable'
const { isTabletOrGreater } = useDevice()  // See Architecture doc for full API
</script>
```

### Feature Flags

Test in prod mode to verify flag behavior (dev mode enables all flags):

```typescript
// Use this to simulate production behavior
const { isFeatureEnabledInProd } = useFeatureFlags()
if (isFeatureEnabledInProd(FeatureFlag.MY_FEATURE)) {
  // Feature code
}
```

### Vue Shims

ESLint ignores these files - check `eslint.config.mjs` if adding new shims:

```javascript
// eslint.config.mjs
{
  ignores: [
    'src/shims-*.d.ts', // Type declaration files ignored
  ]
}
```

### Sliding Panel Touchable Detection

❌ **Wrong**: Always showing buttons on mobile

```vue
<SlidingPanel :show-buttons="true"></SlidingPanel>
```

✅ **Correct**: Use composable to detect touchable

```vue
<template>
  <SlidingPanel :show-buttons="!isTouchable" />
</template>

<script setup lang="ts">
import { useDevice } from '../../composables/use-device.composable'
const { isTouchable } = useDevice()
</script>
```

### Price Range Transformation

❌ **Wrong**: Hardcoding currency conversion

```typescript
const priceInEuros = priceInCents / 100
```

✅ **Correct**: Use snippetConfig transformation

```typescript
// src/x-components/plugin.options.ts
snippetConfig: {
  transformPriceRange: (min, max) => ({
    min: formatCurrency(min),
    max: formatCurrency(max),
  })
}
```

## Wiring Pattern Issues

### Understanding Wire Overrides

✅ **Good pattern**: Filter events before they trigger

```typescript
// GOOD - filter pattern
const setSearchQueryFiltered = filter(
  setSearchQuery,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)
```

⚠️ **Warning**: Setting wires to `undefined` to disable default behavior

```typescript
// USE WITH CAUTION - only if you understand the implications
RelatedPromptsResponseChanged: {
  trackNoResultsQueryWithFallbackWireDebounced: undefined,  // Disables default tracking
}
```

**Only disable wires when**:

- You have custom tracking logic to replace it
- Analytics requirements differ from X Components defaults
- You understand the tracking implications

## Build Configuration Issues

### Rollup Chunk Naming

✅ **Good pattern**: Semantic chunk names for analytics

```typescript
// GOOD - semantic naming for tracking
chunkFileNames: chunkInfo => {
  switch (chunkInfo.name) {
    case 'custom-main-modal':
      return 'x-empty-search-[hash].js'
    case 'index':
      return 'x-search-[hash].js'
    default:
      return '[name].[hash].js'
  }
}
```

❌ **Wrong**: Generic names lose analytics value

```typescript
// BAD - no analytics insight
chunkFileNames: '[name].[hash].js'
```
