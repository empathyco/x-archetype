# Figma MCP Integration Workflow

## Overview

**Common Use Case**: Transferring visual design updates from Figma into this project while maintaining design system consistency.

## ⚠️ IMPORTANT: Scope Boundaries

When translating Figma designs to code:

**✅ DO**: Focus on styling, theming, and visual implementation

- Apply design tokens (colors, spacing, typography, borders)
- Update Tailwind classes to match visual design
- Adjust component variants and styles
- Map Figma tokens to X Tailwind design system

**🚨 DO NOT**: Make structural changes without developer approval

- Refactor existing component architecture
- Create new components from scratch
- Modify component logic or behavior
- Change layout structure significantly

**Instead**: Warn the developer about needed changes and wait for confirmation before proceeding with structural modifications.

## Design Token Mapping Strategy

When receiving Figma designs, follow this workflow:

### 1. Audit Figma Design Tokens

- Identify colors, spacing, typography, and border radius used in Figma
- Check if tokens exist in [X Tailwind theme](https://github.com/empathyco/x/blob/main/packages/x-tailwindcss/src/x-tailwind-plugin/theme.ts)
- **Prioritize using existing tokens** to minimize custom overrides

### 2. Map Figma Tokens to X Tailwind

#### Colors

Use semantic names (`neutral`, `lead`, `auxiliary`, `accent`, `highlight`, `success`, `warning`, `error`)

- Figma `#283034` → `theme('x.colors.neutral.90')`
- Figma `#5E7782` → `theme('x.colors.lead.50')`

#### Spacing

Use 8px-based scale:

- Figma `16px` → `theme('x.spacing.16')` or `x-spacing-16`
- Figma `24px` → `theme('x.spacing.24')` or `x-spacing-24`

#### Typography

Match font sizes to scale:

- Figma `14px` → `theme('x.fontSize.sm')` or `.x-text1-md`
- Figma `24px` → `theme('x.fontSize.xl')` or `.x-title1-sm`

### 3. Extend Theme Only When Necessary

If Figma tokens differ from defaults, update `src/tailwind/plugin-options.ts`:

```typescript
theme: {
  extend: {
    // Override specific X Tailwind tokens
    colors: plugin => ({
      ...plugin.theme('x.colors'),
      // Add project-specific color if not in design system
      custom: {
        primary: '#YOUR_COLOR',
      },
    }),
  },
}
```

**Minimize custom values** - prefer adjusting Figma to use design system tokens.

### 4. Use Pre-built Components First

Check [component library](https://github.com/empathyco/x/tree/main/packages/x-tailwindcss/src/x-tailwind-plugin/components) before creating custom styles.

**Examples**:

- `.x-button-md`, `.x-input-lg`, `.x-tag-outlined`, `.x-badge-accent`
- Apply variants: `.x-button.x-button-lg.x-button-accent.x-button-outlined`

### 5. Component Class Pattern

- **Base classes**: `.x-button`, `.x-input`, `.x-tag`
- **Size variants**: `-sm`, `-md`, `-lg`, `-xl`
- **Color variants**: `-neutral`, `-lead`, `-accent`, `-highlight`
- **Style variants**: `-outlined`, `-ghost`, `-solid`, `-tight`

## Figma to Code Translation Examples

### Simple Components

```vue
<!-- Figma: Button with #5E7782 background, 16px padding, 14px text -->
<!-- ✅ Correct: Use design system -->
<button class="x-button x-button-lead x-button-md">
  Click me
</button>

<!-- Figma: Card with 24px padding, 8px border radius, #EEF1F2 background -->
<!-- ✅ Correct: Use utility classes -->
<div class="x-rounded-md x-bg-neutral-10 x-p-24">
  Card content
</div>

<!-- Figma: Heading with 32px font, bold weight -->
<!-- ✅ Correct: Use typography component -->
<h1 class="x-title1 x-title1-md">
  Heading text
</h1>
```

### Complex Components

```vue
<!-- Figma: Custom sliding panel with chevron buttons -->
<!-- ✅ Correct: Use SlidingPanel with custom button styling -->
<SlidingPanel
  :show-buttons="!isTouchable"
  :reset-on-content-change="false"
  button-class="x-button-lead x-button-circle x-button-ghost x-p-0"
  scroll-container-class="desktop:x-sliding-panel-fade desktop:x-sliding-panel-fade-sm"
  class="x-sliding-panel-show-buttons-on-hover"
>
  <template #sliding-panel-left-button>
    <ChevronLeftIcon class="x-icon-lg" />
  </template>
  <template #sliding-panel-right-button>
    <ChevronRightIcon class="x-icon-lg" />
  </template>
  <slot />
</SlidingPanel>

<!-- Figma: Facet filter with custom styling -->
<!-- ✅ Correct: Use SimpleFilter with design system classes -->
<SimpleFilter
  :filter="filter"
  class="x-facet-filter x-facet-filter-md x-flex x-items-center x-gap-8"
/>
```

## Design System First Approach

**Always prioritize the design system** to ensure:

- Consistent visual language across the project
- Minimal maintenance burden (centralized token updates)
- Automatic responsiveness via breakpoint tokens
- Accessibility compliance built into components
