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

## 🎯 CRITICAL: X Design System First Rule

**🚨 ALWAYS check if X Design System already provides the component before creating custom overrides.**

**Examples of what NOT to override:**

- Standard font weights (300, 400, 600, 700)
- Standard spacing values (8px increments: 8, 16, 24, 32, 40, 48, 56, 64, 80, 96...)
- Default font families (Roboto, Inter, etc.)
- Standard color scales that already exist
- **Existing components**: `xds:tag`, `xds:button`, `xds:input`, `xds:icon`, etc.

**✅ CORRECT**: Use existing X Design System components + minimal brand-specific overrides
**❌ WRONG**: Recreate components that already exist in X Design System

Examples of what NOT to override:

- Standard font weights (300, 400, 600, 700)
- Standard spacing values (8px increments: 8, 16, 24, 32, 40, 48, 56, 64, 80, 96...)
- Default font families (Roboto, Inter, etc.)
- Standard color scales that already exist

## Figma MCP Integration Rules

These rules define how to translate Figma inputs into code for this project and must be followed for every Figma-driven change.

### Required flow (do not skip)

1. Run get_design_context first to fetch the structured representation for the exact node(s).
2. If the response is too large or truncated, run get_metadata to get the high‑level node map and then re‑fetch only the required node(s) with get_design_context.
3. Run get_screenshot for a visual reference of the node variant being implemented.
4. Only after you have both get_design_context and get_screenshot, download any assets needed and start implementation.
5. Translate the output (usually Vue 3 + Tailwind 4, but always check project setup) into this project's conventions, styles and framework. Reuse the project's color tokens, components, and typography wherever possible.
6. Validate against Figma for 1:1 look and behavior before marking complete.

### Implementation rules

- Treat the Figma MCP output (Vue + Tailwind) as a representation of design and behavior, not as final code style.
- Replace Tailwind utility classes with the project's X Design System classes (all use `xds:` prefix) when applicable.
- Reuse existing components (e.g., buttons, inputs, typography, icon wrappers) instead of duplicating functionality.
- Use the project's color system, typography scale, and spacing tokens consistently.
- Respect existing routing, state management, and data‑fetch patterns already adopted in the repo.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design‑system tokens and adjust spacing or sizes minimally to match visuals.
- Validate the final UI against the Figma screenshot for both look and behavior.

## Design Token Mapping Strategy

When receiving Figma designs, follow this workflow:

### 1. Audit Figma Design Tokens

- Identify colors, spacing, typography, and border radius used in Figma
- Check if tokens exist in [X Design System theme](https://github.com/empathyco/x/tree/main/packages/x-design-system)
- **Prioritize using existing tokens** to minimize custom overrides

### 2. Map Figma Tokens to X Design System

#### Colors

Use semantic names (`neutral`, `lead`, `auxiliary`, `accent`, `highlight`, `success`, `warning`, `error`)

- Figma `#283034` → `xds:neutral-90` utility class
- Figma `#5E7782` → `xds:lead-50` utility class

#### Spacing

Use 8px-based scale:

- Figma `16px` → `xds:gap-16` or `xds:p-16`
- Figma `24px` → `xds:gap-24` or `xds:p-24`

#### Typography

Match font sizes to scale:

- Figma `14px` → `xds:text1`
- Figma `24px` → `xds:title1`

### 3. Extend Theme Only When Necessary

If Figma tokens differ from defaults, create custom utilities in `src/tailwind/xds.css`:

```css
@utility brand-primary {
  @apply xds:bg-lead-50 xds:text-neutral-0;
}

@utility custom-spacing {
  gap: 20px; /* Only if not in design system */
}
```

**Minimize custom values** - prefer adjusting Figma to use design system tokens.

### 4. Use Pre-built Components First

Check [component library](https://github.com/empathyco/x/tree/main/packages/x-design-system) before creating custom styles.

**Examples**:

- `xds:button-md`, `xds:input-lg`, `xds:tag-outlined`, `xds:badge-accent`
- Apply variants: `xds:button xds:button-lg xds:button-accent xds:button-outlined`

### 5. Component Class Pattern

- **Base classes**: `xds:button`, `xds:input`, `xds:tag`
- **Size variants**: `-sm`, `-md`, `-lg`, `-xl`
- **Color variants**: `-neutral`, `-lead`, `-accent`, `-highlight`
- **Style variants**: `-outlined`, `-ghost`, `-solid`, `-tight`

## Figma to Code Translation Examples

### Simple Components

```vue
<!-- Figma: Button with #5E7782 background, 16px padding, 14px text -->
<!-- ✅ Correct: Use design system -->
<button class="xds:button xds:button-md xds:button-lead">
  Click me
</button>

<!-- Figma: Card with 24px padding, 8px border radius, #EEF1F2 background -->
<!-- ✅ Correct: Use utility classes -->
<div class="xds:rounded-md xds:bg-neutral-10 xds:p-24">
  Card content
</div>

<!-- Figma: Heading with 32px font, bold weight -->
<!-- ✅ Correct: Use typography component -->
<h1 class="xds:title1">
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
  button-class="xds:button-lead xds:button-circle xds:button-ghost xds:p-0"
  scroll-container-class="desktop:xds:sliding-panel-fade desktop:xds:sliding-panel-fade-sm"
  class="xds:sliding-panel-show-buttons-on-hover"
>
  <template #sliding-panel-left-button>
    <ChevronLeftIcon class="xds:icon-lg" />
  </template>
  <template #sliding-panel-right-button>
    <ChevronRightIcon class="xds:icon-lg" />
  </template>
  <slot />
</SlidingPanel>

<!-- Figma: Facet filter with custom styling -->
<!-- ✅ Correct: Use SimpleFilter with design system classes -->
<SimpleFilter
  :filter="filter"
  class="xds:facet-filter xds:facet-filter-md xds:flex xds:items-center xds:gap-8"
/>
```

## Design System First Approach

**Always prioritize the design system** to ensure:

- Consistent visual language across the project
- Minimal maintenance burden (centralized token updates)
- Automatic responsiveness via breakpoint tokens
- Accessibility compliance built into components
