# Architecture

## Core Integration Pattern

The app initializes via `src/main.ts` → `XInstaller` with options from `src/x-components/plugin.options.ts`. This pattern configures:

- **Adapter**: Maps API requests/responses (`src/adapter/adapter.ts`)
- **X Modules**: Configures search, facets, semantic queries, history, etc. with module-specific wiring
- **Wiring**: Custom event handlers that override default X Components behavior (see `src/x-components/wiring/`)

## Adapter System

- Production: Uses `@empathyco/x-adapter-platform` endpoints
- Docker dev: `src/adapter/docker.adapter.ts` overrides endpoints when `VUE_APP_DEVELOPMENT_DOCKER=true`
- **Schema overrides**: Extend `resultSchema`, `facetSchema`, etc. to map platform-specific fields (see `adapter.ts` examples)
- Custom facet logic: `src/adapter/utils/facet.utils.ts` (e.g., price range as editable slider)

## Component Architecture

- **Script setup**: Prefer `<script setup lang="ts">` for new components (most of codebase uses this)
- **Options API**: Only for legacy components using `defineComponent()` (in `src/components/teleport/`, `src/components/search/results/next-queries-*.vue`)
- **Async loading**: Large components lazy-loaded via `defineAsyncComponent()` (e.g., `MainModal`, `Results`)
- **Device-specific**: `src/components/mobile/` and `src/components/desktop/` for responsive layouts
  - Use `useDevice()` composable for device detection:
    ```typescript
    const {
      isMobile, isTablet, isDesktop,                    // Exact device
      isMobileOrGreater, isTabletOrGreater, etc.,       // Range detection
      deviceName, isTouchable, orientation              // Device info
    } = useDevice()
    ```
  - Common: `isTabletOrGreater` (tablet + desktop), `isTouchable` (hide buttons on touch devices)
  - **Important**: `isMobile` (< 744px) ≠ `mobile:` Tailwind modifier (≥ 0px)

## State Management

- Vuex store (`src/store/index.ts`) is minimal - X Components manages most state internally
- Access X state: `use$x()` for reactive getters, `useState('moduleName')` for module state
- Custom events: Extend types in `src/shims-x-components.d.ts` (see `XEventsTypes` interface)
