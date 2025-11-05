# Design System & Tailwind CSS

## X Tailwind Design System

### Core Principle

**Always use design tokens from the [X Tailwind design system](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss) instead of creating custom values.**

### Tailwind Configuration

- **Prefix**: ALL custom classes use `x-` prefix (configured in `tailwind.config.ts`)
- **Theme**: Extends `@empathyco/x-tailwindcss` design system (colors, spacing, fonts)
- **Migration note**: TODO exists to remove `x-` prefix after x-tailwindcss 2.x migration completes

### 🚨 CRITICAL: Device Breakpoints Synchronization

**MUST** be defined consistently in both files:

- **`src/device-breakpoints.ts`** → Controls Vue component logic via `useDevice()` composable
- **`tailwind.config.ts`** → Generates responsive CSS classes (`desktop:x-*`, `tablet:x-*`)

**Default values**:

```typescript
// src/device-breakpoints.ts
export const deviceBreakpoints = {
  mobile: 0,
  tablet: 744,
  desktop: 1280,
}
```

**If these don't match**: CSS applies at one breakpoint but Vue detects a different device, breaking responsive behavior.

See [Common Pitfalls - Device Breakpoints](./10-common-pitfalls.md#critical-device-breakpoints-synchronization) for detailed examples.

## Theme Customization Patterns

### Pattern 1: Theme Token Overrides

Use this pattern to override semantic colors and fonts with brand-specific values:

```typescript
// src/tailwind/plugin-options.ts
theme: {
  extend: {
    x: (theme: (param: string) => string) => ({
      colors: {
        // Override semantic colors with brand colors
        neutral: {
          10: '#F6F6F6',
          25: '#E2E6E9',
          50: '#D8D8D8',
          75: '#7A7A7A',
          90: '#474747',
        },
        lead: {
          25: '#7A5891',
          50: '#EA2221',
          75: '#221F24',
        },
      },
      fontFamily: {
        main: "'Montserrat', sans-serif",
        alternative: "'Montserrat', sans-serif",
      },
    }),
    // Map X tokens to Tailwind utilities
    fontFamily: plugin => plugin.theme('x.fontFamily'),
    fontSize: plugin => plugin.theme('x.fontSize'),
    spacing: plugin => plugin.theme('x.spacing'),
    colors: plugin => plugin.theme('x.colors'),
  },
}
```

### Pattern 2: Custom Component Extensions

Only when X Tailwind components don't cover the use case:

```typescript
// src/tailwind/plugin-options.ts
components: ({ theme }) => ({
  '.message': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme('spacing.8'),
    backgroundColor: theme('colors.neutral.10'),
    padding: theme('spacing.24'),
  },
  '.transform-style-3d': {
    transformStyle: 'preserve-3d',
  },
})
```

### ❌ Anti-patterns to Avoid

- Creating one-off colors instead of using semantic tokens
- Hardcoding spacing values (use `theme('spacing.X')`)
- Custom components that duplicate X Tailwind components
- Overriding without understanding the cascade implications

### ⚠️ Advanced Pattern: CSS Variable Integration

**Only use if you need runtime theming from API** (rare). Standard projects should use Pattern 1.

```typescript
// Only for dynamic theming use cases
css: {
  variables: {
    '--custom-color-primary': '#f5f5f5',
    '--custom-spacing-unit': '8px',
  },
  custom: 'h1 { color: var(--custom-color-primary); }',
}
```

## X Tailwind Design System Structure

The design system provides three layers of styling:

### 1. Theme Tokens

[`theme.ts`](https://github.com/empathyco/x/blob/main/packages/x-tailwindcss/src/x-tailwind-plugin/theme.ts)

- **Colors**: Semantic color palette (neutral, lead, auxiliary, accent, highlight, success, warning, error)
- **Spacing**: Consistent scale from `0` to `512px` (e.g., `x-spacing-8`, `x-spacing-16`, `x-spacing-24`)
- **Typography**: `fontSize` (`xs` to `8xl`), `fontWeight` (light/regular/bold), `lineHeight`, `letterSpacing`
- **Border**: `borderRadius` (none/xs/sm/md/lg/xl/full), `borderWidth` (1/2/4)

### 2. Component Styles

[`components/`](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss/src/x-tailwind-plugin/components)

- **Pre-built components**: `.x-button`, `.x-input`, `.x-tag`, `.x-badge`, `.x-icon`, `.x-suggestion`
- **Variants**: sizes (sm/md/lg/xl), colors (neutral/lead/accent/highlight), styles (outlined/ghost/solid)
- **Typography**: `.x-title1` to `.x-title4`, `.x-text1`, `.x-text2`
- **Layout**: `.x-layout-stack`, `.x-layout-expand`, `.x-scroll`

### 3. Dynamic Components

[`dynamic-components/`](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss/src/x-tailwind-plugin/dynamic-components)

Runtime-generated component utilities.

### ⚠️ Deprecated

**Do NOT use styles from [`old-ds-plugin/`](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss/src/old-ds-plugin)** - this is the old design system.

## Component Class Pattern

Apply component classes following this structure:

```vue
<!-- Base component class -->
<button class="x-button x-button-lead x-button-md">
  Click me
</button>

<!-- With variants -->
<button class="x-button x-button-accent x-button-lg x-button-outlined">
  Large Outlined
</button>

<!-- Input with size variant -->
<input class="x-input x-input-lg" />

<!-- Tag with color and style variants -->
<span class="x-tag x-tag-md x-tag-highlight x-tag-solid">
  Tag
</span>
```

### Variant Naming Convention

- **Size variants**: `-sm`, `-md`, `-lg`, `-xl`
- **Color variants**: `-neutral`, `-lead`, `-accent`, `-highlight`
- **Style variants**: `-outlined`, `-ghost`, `-solid`, `-tight`

## Design System First Approach

**Always prioritize the design system** to ensure:

- Consistent visual language across the project
- Minimal maintenance burden (centralized token updates)
- Automatic responsiveness via breakpoint tokens
- Accessibility compliance built into components
