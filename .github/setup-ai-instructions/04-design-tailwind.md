# Design System & Tailwind CSS

> **🚨 CRITICAL WARNING**: Before creating ANY custom component styles, **ALWAYS check if X Tailwind already provides the component**. X Tailwind has comprehensive component libraries (buttons, tags, inputs, etc.) that should be leveraged with minimal brand-specific overrides only. **This is not optional - it's the fundamental pattern for working with X Tailwind effectively.**

## X Tailwind Design System

### 🚨 CORE PRINCIPLE: Leverage Existing X Tailwind Components

**🔥 CRITICAL: ALWAYS check if X Tailwind already provides the component before creating custom overrides.**

**X Tailwind already includes comprehensive component libraries:**

- **Buttons**: `.x-button`, `.x-button-{color}`, `.x-button-{size}`, `.x-button-outlined`, etc.
- **Tags**: `.x-tag`, `.x-tag-{color}`, `.x-tag-{size}`, `.x-tag-solid`, `.x-tag-ghost`, etc.
- **Inputs**: `.x-input`, `.x-input-{size}`, input variants
- **Icons**: `.x-icon`, `.x-icon-{size}`, icon utilities
- **Typography**: `.x-title1`, `.x-text1`, typography scales
- **Layout**: `.x-layout-stack`, `.x-layout-expand`, layout utilities

**✅ CORRECT APPROACH - Leverage existing + minimal overrides:**

```typescript
// Use existing X Tailwind tag component
class="x-tag x-tag-lead x-tag-md x-font-bold"

// Only override brand-specific styling
'.x-tag.x-selected': {
  backgroundColor: theme('x.colors.lead.50'), // MartiMotos red
  color: theme('x.colors.neutral.0'), // White text
}
```

**❌ WRONG APPROACH - Recreating existing components:**

```typescript
// DON'T DO THIS - X Tailwind already provides .x-tag
'.x-tag-custom': {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  // ... recreating what already exists
}
```

**Always use design tokens from the [X Tailwind design system](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss) instead of creating custom values.**

### 🎯 CRITICAL: X Tailwind Integration Rules

**🚨 STEP 1: ALWAYS CHECK X TAILWIND FIRST**

```bash
# Search for existing components before creating custom ones
grep -r "x-tag\|x-button\|x-input" node_modules/@empathyco/x-tailwindcss/dist/
```

**🚨 STEP 2: USE EXISTING COMPONENTS + MINIMAL OVERRIDES**

- **NEVER recreate X Tailwind components** - they already provide comprehensive styling, states, variants, and accessibility
- **Only override brand-specific values** - colors, fonts, spacing that differ from defaults
- **Leverage existing variants** - sizes, colors, states (solid, outlined, ghost, selected)

**🚨 STEP 3: FOLLOW X TAILWIND PATTERNS**

- **NEVER override X Tailwind default values** - only add custom values that differ from the standard X Tailwind design system
- Always check what exists by default before adding overrides
- **Follow X Tailwind naming conventions** - use scale names (xs, sm, md, lg, xl, 2xl) instead of numeric values
- **Create intermediate scale values** using descriptive names that indicate position in hierarchy

**Examples of what EXISTS and should NOT be recreated:**

- **Tag components**: `.x-tag`, `.x-tag-{color}`, `.x-tag-{size}`, `.x-tag-solid`, `.x-tag-ghost`, `.x-selected` state
- **Button components**: `.x-button`, `.x-button-{color}`, `.x-button-{size}`, `.x-button-outlined`, `.x-button-ghost`
- **Input components**: `.x-input`, `.x-input-{size}`, input states and variants
- **Typography**: `.x-title1-4`, `.x-text1-2`, typography scales and responsive variants
- **Standard values**: Font weights (300, 400, 600, 700), spacing (8px increments), default fonts, color scales

### 🎯 CRITICAL: Scale Extension Pattern

When extending X Tailwind scales (fontSize, lineHeight, spacing), **always use descriptive intermediate names** instead of numeric values:

**❌ WRONG - Numeric values**:

```typescript
fontSize: {
  22: '22px',  // Bad - no context about scale position
  28: '28px',  // Bad - doesn't follow naming pattern
}
```

**✅ CORRECT - Intermediate scale names**:

```typescript
fontSize: {
  'lg-xl': '22px',    // Between lg/20px and xl/24px
  'xl-2xl': '28px',   // Between xl/24px and 2xl/32px
}
```

**Benefits**:

- Clear hierarchy positioning (`lg-xl` is obviously between `lg` and `xl`)
- Consistent with X Tailwind naming conventions
- Self-documenting scale relationships
- Easier maintenance and understanding

**Standard X Tailwind scales for reference**:

- **fontSize**: xs=12px, sm=14px, md=16px, lg=20px, xl=24px, 2xl=32px
- **lineHeight**: varies but follows similar pattern
- **spacing**: 0, 1=4px, 2=8px, 4=16px, 6=24px, 8=32px, etc.

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

## Typography Component Integration

When implementing typography from Figma designs that use predefined X Tailwind typography classes (`.x-text1`, `.x-text2`, `.x-title1`, `.x-title2`, etc.), follow this pattern:

### 1. Add Custom Theme Tokens

First, extend the theme with custom fontSize and lineHeight values that differ from X Tailwind defaults:

```typescript
// src/tailwind/plugin-options.ts
theme: {
  extend: {
    x: (theme) => ({
      fontSize: {
        20: '20px',  // Custom sizes from Figma
        22: '22px',
        28: '28px',
      },
      lineHeight: {
        16: '16px',  // Custom line heights from Figma
        20: '20px',
        24: '24px',
        32: '32px',
      },
    }),
  }
}
```

### 2. Override Typography Components

Then add component overrides to ensure exact Figma matching:

```typescript
// src/tailwind/plugin-options.ts
components: ({ theme }: { theme: (path: string) => any }) => ({
  /* eslint-disable ts/no-unsafe-assignment */

  // Title 1 - 28px font, 32px line height from Figma
  '.x-title1': {
    fontFamily: theme('x.fontFamily.main'),
    fontWeight: theme('x.fontWeight.bold'),
    fontSize: theme('x.fontSize.28'), // Custom MartiMotos token
    lineHeight: theme('x.lineHeight.32'), // Custom MartiMotos token
  },
  '.x-title1-sm': {
    fontSize: theme('x.fontSize.28'),
    lineHeight: theme('x.lineHeight.32'),
  },
  // ... repeat for all size variants

  /* eslint-enable ts/no-unsafe-assignment */
})
```

### 3. Why Both Steps Are Needed

- **Theme tokens**: Provide the raw values that components can reference
- **Component overrides**: Ensure typography components use exact Figma specifications instead of X Tailwind defaults

This pattern ensures that classes like `.x-title1`, `.x-title2-md`, etc. match the Figma design system exactly rather than using X Tailwind's default font/line height combinations.

## 🚨 CRITICAL: Design System First Approach

**This is exactly how X Tailwind is meant to be used - leverage the existing design system and only customize what's truly brand-specific!**

### ✅ The CORRECT Approach

1. **Check X Tailwind first**: Search for existing components before creating anything
2. **Use existing components**: Apply `.x-tag`, `.x-button`, `.x-input` with their variants
3. **Minimal overrides only**: Only customize brand colors, fonts, or spacing that truly differ
4. **Preserve functionality**: Keep X Tailwind's hover states, accessibility, responsive behavior

**Example of proper usage:**

```typescript
// ✅ CORRECT - Leverage X Tailwind + minimal brand overrides
components: ({ theme }) => ({
  // Override ONLY the selected state for brand colors
  '.x-tag.x-selected': {
    backgroundColor: theme('x.colors.lead.50'), // MartiMotos red
    color: theme('x.colors.neutral.0'), // White text
    fontWeight: theme('x.fontWeight.bold'), // Bold for selected
  },

  // Override ONLY font weight for specific tag types
  '.x-tag-auxiliary': {
    fontWeight: '300', // Light for related tags
  },
})

// In components, use existing X Tailwind classes
<tag class="x-tag x-tag-lead x-tag-md x-font-bold">
```

```typescript
// ❌ WRONG - Recreating what already exists
components: ({ theme }) => ({
  '.x-custom-tag': {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: 'white',
    border: '1px solid gray',
    borderRadius: '4px',
    // ... 50+ lines recreating .x-tag
  },
})
```

### 💡 Benefits of This Approach

- **Less code**: Leverage existing X Tailwind components (avoid 70+ lines of redundant CSS)
- **Better maintainability**: Built on proven X Tailwind component system
- **Automatic features**: Get hover states, accessibility, responsive behavior for free
- **Future-proof**: Automatically benefit from X Tailwind updates
- **Performance**: Smaller CSS bundle, better tree-shaking

**Always prioritize the design system** to ensure:

- Consistent visual language across the project
- Minimal maintenance burden (centralized token updates)
- Automatic responsiveness via breakpoint tokens
- Accessibility compliance built into components

### 🚨 Remember: Check First, Override Minimally

Before adding any custom component styles, **always search X Tailwind first**:

```bash
grep -r "x-component-name" node_modules/@empathyco/x-tailwindcss/dist/
```

If it exists, use it with minimal brand-specific overrides. This is **not optional** - it's the fundamental pattern for working with X Tailwind effectively.
