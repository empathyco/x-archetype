# Build System

## Rollup Configuration

### Base Configuration

- **Location**: `build/instrumentation.build.mjs`
- **Pattern**: Shared `createConfig` function
- **Purpose**: Common build logic across all archetypal projects

### Project Configuration

**Location**: `rollup.config.mjs`

Override output chunk names for analytics tracking:

```javascript
export default createConfig({
  output: {
    chunkFileNames: chunkInfo => {
      switch (chunkInfo.name) {
        case 'custom-main-modal':
          return 'x-empty-search-[hash].js'
        case 'index':
          return 'x-search-[hash].js'
        default:
          return '[name].[hash].js'
      }
    },
  },
  plugins: {
    ...rollupCssInjectorConfig,
  },
})
```

### CSS Injection Pattern

Uses `@empathyco/x-archetype-utils` CSS injector:

```javascript
import { rollupCssInjectorConfig } from '@empathyco/x-archetype-utils'
```

This ensures CSS is properly injected into Shadow DOM when `isolate: true`.

## Dev vs Production

### Development (Vite)

- **Command**: `npm run serve`
- **Features**:
  - Fast HMR (Hot Module Replacement)
  - Inspector plugin for component debugging
  - Source maps enabled
- **Server**: `localhost:8080`

### Production (Rollup)

- **Command**: `npm run build`
- **Features**:
  - Code splitting for optimal loading
  - Terser minification
  - Optimized chunks with semantic naming
  - Tree shaking for unused code removal
- **Output**: `dist/`

### Build and Serve

Test production build locally:

```bash
npm run build:serve  # Builds + serves dist/
```

## Environment Configuration

### Docker Development

Set environment variable to use docker endpoints:

```bash
VUE_APP_DEVELOPMENT_DOCKER=true npm run build
```

This activates `src/adapter/docker.adapter.ts` which overrides API endpoints.

### Production Build

Default build uses production endpoints from `src/adapter/adapter.ts`.

## Bundle Analysis

Use Rollup visualizer plugin to analyze bundle size:

```javascript
import { visualizer } from 'rollup-plugin-visualizer'

plugins: [
  visualizer({
    filename: 'dist/stats.html',
    open: true,
  }),
]
```

Run build to see bundle composition.
