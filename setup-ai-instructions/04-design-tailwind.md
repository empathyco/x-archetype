# Design System & Tailwind 4 CSS

> **🚨 CRITICAL WARNING**: Before creating ANY custom component styles, **ALWAYS check if X Design System already provides the component**. X Design System has comprehensive component libraries (buttons, tags, inputs, etc.) that should be leveraged with minimal brand-specific overrides only. **This is not optional - it's the fundamental pattern for working with X Design System effectively.**

## X Design System with Tailwind 4

### 🚨 CORE PRINCIPLE: Leverage Existing X Design System Components

**🔥 CRITICAL: ALWAYS check if X Design System already provides the component before creating custom overrides.**

**X Design System already includes comprehensive component libraries:**

- **Buttons**: `xds:button`, `xds:button-{color}`, `xds:button-{size}`, `xds:button-outlined`, etc.
- **Tags**: `xds:tag`, `xds:tag-{color}`, `xds:tag-{size}`, `xds:tag-solid`, `xds:tag-ghost`, etc.
- **Inputs**: `xds:input`, `xds:input-{size}`, input variants
- **Icons**: `xds:icon`, `xds:icon-{size}`, icon utilities
- **Typography**: `xds:title1`, `xds:title2`, `xds:text1`, `xds:text2`, typography scales
- **Layout**: `xds:layout-stack`, `xds:layout-expand`, layout utilities

**✅ CORRECT APPROACH - Leverage existing + minimal overrides:**

```css
/* Use existing X Design System tag component */
@utility custom-selected-tag {
  @apply xds:tag xds:tag-md xds:tag-lead xds:font-bold;
}

/* Only override brand-specific styling if needed */
@utility brand-selected {
  @apply xds:bg-lead-50 xds:text-neutral-0;
}
```

**❌ WRONG APPROACH - Recreating existing components:**

```css
/* DON'T DO THIS - X Design System already provides xds:tag */
@utility custom-tag {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  /* ... recreating what already exists */
}
```

**Always use design tokens from the [X Design System](https://github.com/empathyco/x/tree/main/packages/x-design-system) instead of creating custom values.**

### 🎯 CRITICAL: X Design System Integration Rules

**🚨 STEP 1: ALWAYS CHECK X DESIGN SYSTEM FIRST**

```bash
# Search for existing components before creating custom ones
grep -r "button\|tag\|input" node_modules/@empathyco/x-design-system/dist/
```

**🚨 STEP 2: USE EXISTING COMPONENTS + MINIMAL OVERRIDES**

- **NEVER recreate X Design System components** - they already provide comprehensive styling, states, variants, and accessibility
- **Only override brand-specific values** - colors, fonts, spacing that differ from defaults
- **Leverage existing variants** - sizes, colors, states (solid, outlined, ghost, selected)

**🚨 STEP 3: FOLLOW TAILWIND 4 CSS-FIRST PATTERNS**

- Configuration is in `src/tailwind/xds.css` using `@import 'tailwindcss' prefix(xds)`
- **ALL classes use `xds:` prefix** - e.g., `xds:button`, `xds:flex`, `xds:bg-white`
- Custom utilities use `@utility` directive
- Responsive variants use `@variant` directive
- **NEVER override X Design System default values** - only add custom values that differ from the standard design system

**Examples of what EXISTS and should NOT be recreated:**

- **Tag components**: `xds:tag`, `xds:tag-{color}`, `xds:tag-{size}`, `xds:tag-solid`, `xds:tag-ghost`, `xds:selected` state
- **Button components**: `xds:button`, `xds:button-{color}`, `xds:button-{size}`, `xds:button-outlined`, `xds:button-ghost`
- **Input components**: `xds:input`, `xds:input-{size}`, input states and variants
- **Typography**: `xds:title1-4`, `xds:text1-2`, typography scales and responsive variants
- **Standard values**: Font weights (300, 400, 600, 700), spacing (8px increments), default fonts, color scales

### Tailwind 4 Configuration

- **CSS-First**: Configuration is in `src/tailwind/xds.css` using `@import 'tailwindcss' prefix(xds)`
- **Prefix**: ALL Tailwind classes use `xds:` prefix - e.g., `xds:flex`, `xds:bg-white`, `xds:button`
- **Theme**: Imports `@empathyco/x-design-system` components, theme, and variants
- **Custom utilities**: Define using `@utility` directive in `xds.css`
- **Responsive variants**: Define using `@variant` directive (e.g., `@variant desktop`)

**Important**: The `prefix(xds)` directive means ALL Tailwind utilities are prefixed with `xds:` when used in HTML.

### 🚨 CRITICAL: Device Breakpoints Synchronization

**MUST** be defined consistently in both locations:

- **`src/composables/use-device.composable.ts`** → Controls Vue component logic via `useDevice()` composable
- **`src/tailwind/xds.css`** → Generates responsive CSS classes via `@variant` directives (`desktop:xds:*`, `tablet:xds:*`)

**Default values**:

```typescript
// src/composables/use-device.composable.ts
export const breakpoints = {
  mobile: 0,
  tablet: 744,
  desktop: 1280,
  large: 2560,
}
```

**Usage in HTML**: Classes are prefixed with breakpoint name, e.g., `desktop:xds:flex`, `tablet:xds:grid`

**If these don't match**: CSS applies at one breakpoint but Vue detects a different device, breaking responsive behavior.

See [Common Pitfalls - Device Breakpoints](./10-common-pitfalls.md#critical-device-breakpoints-synchronization) for detailed examples.

## Theme Customization Patterns

### Pattern 1: Custom Utilities with Tailwind 4

Use `@utility` directive in `src/tailwind/xds.css` for reusable custom styles:

```css
@utility message {
  @apply xds:flex xds:flex-wrap xds:items-center xds:justify-center xds:gap-8;
  @apply xds:bg-neutral-10 xds:px-8 xds:py-8 xds:text-center;

  @variant desktop {
    @apply xds:py-24;
  }
}

@utility transform-style-3d {
  @apply xds:transform-3d;
}
```

### Pattern 2: Responsive Variants

Define device-specific styles using `@variant`:

```css
@utility my-component {
  @apply xds:flex-col xds:gap-4;

  @variant tablet {
    @apply xds:flex-row xds:gap-8;
  }

  @variant desktop {
    @apply xds:grid xds:grid-cols-4 xds:gap-16;
  }
}
```

### ❌ Anti-patterns to Avoid

- Creating one-off colors instead of using semantic tokens from X Design System
- Hardcoding spacing values (use X Design System tokens)
- Custom utilities that duplicate X Design System components
- Overriding without understanding the cascade implications

## X Design System Structure

The design system provides styling through Tailwind 4 CSS with three main imports:

### Design System Files

**Location**: `node_modules/@empathyco/x-design-system/dist/`

- **`components/index.css`**: Pre-built component styles (buttons, inputs, tags, etc.)
- **`theme.css`**: Theme tokens (colors, spacing, typography, borders)
- **`variants.css`**: Component variants (sizes, colors, states)

### Integration in Project

**Location**: `src/tailwind/xds.css`

```css
@import 'tailwindcss' prefix(xds);

@import '../../node_modules/@empathyco/x-design-system/dist/components/index.css';
@import '../../node_modules/@empathyco/x-design-system/dist/theme.css';
@import '../../node_modules/@empathyco/x-design-system/dist/variants.css';

/* Scan tailwind classes from x-components */
@source '../../node_modules/@empathyco/x-components/**/*.js';
```

### Component Classes Available

- **Buttons**: `xds:button`, `xds:button-{color}`, `xds:button-{size}`, `xds:button-outlined`
- **Tags**: `xds:tag`, `xds:tag-{color}`, `xds:tag-{size}`, `xds:tag-solid`, `xds:tag-ghost`
- **Inputs**: `xds:input`, `xds:input-{size}`
- **Typography**: `xds:title1` to `xds:title4`, `xds:text1`, `xds:text2`
- **Icons**: `xds:icon`, `xds:icon-{size}`
- **Layout**: `xds:layout-stack`, `xds:layout-expand`, `xds:scroll`

**Note**: All classes use the `xds:` prefix due to `@import 'tailwindcss' prefix(xds)` in xds.css

## Component Class Pattern

Apply component classes following this structure with `xds:` prefix:

```vue
<!-- Base component class -->
<button class="xds:button xds:button-md xds:button-lead">
  Click me
</button>

<!-- With variants -->
<button class="xds:button xds:button-lg xds:button-outlined xds:button-accent">
  Large Outlined
</button>

<!-- Input with size variant -->
<input class="xds:input xds:input-lg" />

<!-- Tag with color and style variants -->
<span class="xds:tag xds:tag-md xds:tag-highlight xds:tag-solid">
  Tag
</span>
```

### Variant Naming Convention

- **Size variants**: `-sm`, `-md`, `-lg`, `-xl`
- **Color variants**: `-neutral`, `-lead`, `-accent`, `-highlight`
- **Style variants**: `-outlined`, `-ghost`, `-solid`, `-tight`

**All component classes use the `xds:` prefix** because of the `prefix(xds)` directive in xds.css.

## Typography Component Integration

When implementing typography from Figma designs that use predefined X Design System typography classes (`xds:text1`, `xds:text2`, `xds:title1`, `xds:title2`, etc.), follow this pattern:

### 1. Use Existing Typography Classes

X Design System provides typography classes that can be used directly:

```vue
<h1 class="xds:title1">Main Heading</h1>
<h2 class="xds:title2">Sub Heading</h2>
<p class="xds:text1">Body text</p>
<span class="xds:text2">Secondary text</span>
```

### 2. Create Custom Utilities for Brand-Specific Typography

If you need to customize typography for brand-specific requirements, create custom utilities:

```css
/* src/tailwind/xds.css */
@utility brand-title {
  @apply xds:text-xl xds:leading-tight xds:font-bold;

  @variant desktop {
    @apply xds:text-2xl;
  }
}

@utility brand-body {
  @apply xds:text-base xds:leading-normal xds:text-neutral-90;
}
```

Then use in HTML:

```vue
<h1 class="brand-title">Custom Title</h1>
<p class="brand-body">Custom Body Text</p>
```

### 3. Why This Approach Works

- **Tailwind 4 CSS-first**: Configuration is in CSS files, not JavaScript
- **Component-based**: X Design System provides the foundation
- **Customizable**: Create utilities for brand-specific needs
- **Responsive**: Use `@variant` for breakpoint-specific styles
- **Prefixed**: All classes use `xds:` prefix automatically

## 🚨 CRITICAL: Design System First Approach

**This is exactly how X Design System is meant to be used - leverage the existing design system and only customize what's truly brand-specific!**

### ✅ The CORRECT Approach

1. **Check X Design System first**: Search for existing components before creating anything
2. **Use existing components**: Apply `xds:tag`, `xds:button`, `xds:input` with their variants
3. **Minimal overrides only**: Only customize brand colors, fonts, or spacing that truly differ
4. **Preserve functionality**: Keep X Design System's hover states, accessibility, responsive behavior

**Example of proper usage:**

```css
/* ✅ CORRECT - Leverage X Design System + minimal brand overrides */

/* Use existing X Design System component classes in HTML */
<tag class="xds:tag xds:tag-lead xds:tag-md xds:font-bold">

/* Create custom utilities only for brand-specific overrides */
@utility brand-selected-tag {
  @apply xds:tag xds:tag-md xds:tag-lead;
  @apply xds:bg-lead-50 xds:font-bold xds:text-neutral-0;
}
```

```css
/* ❌ WRONG - Recreating what already exists */
@utility custom-tag {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  /* ... 50+ lines recreating xds:tag */
}
```

### 💡 Benefits of This Approach

- **Less code**: Leverage existing X Design System components (avoid 70+ lines of redundant CSS)
- **Better maintainability**: Built on proven X Design System component system
- **Automatic features**: Get hover states, accessibility, responsive behavior for free
- **Future-proof**: Automatically benefit from X Design System updates
- **Performance**: Smaller CSS bundle, better tree-shaking

**Always prioritize the design system** to ensure:

- Consistent visual language across the project
- Minimal maintenance burden (centralized token updates)
- Automatic responsiveness via breakpoint tokens
- Accessibility compliance built into components

### 🚨 Remember: Check First, Override Minimally

Before adding any custom component styles, **always search X Design System first**:

```bash
grep -r "button\|tag\|input" node_modules/@empathyco/x-design-system/dist/
```

If it exists, use it with minimal brand-specific overrides. This is **not optional** - it's the fundamental pattern for working with X Design System effectively.

**Remember**: ALL Tailwind classes use the `xds:` prefix (e.g., `xds:flex`, `xds:button`, `xds:bg-white`) due to `prefix(xds)` in xds.css.
