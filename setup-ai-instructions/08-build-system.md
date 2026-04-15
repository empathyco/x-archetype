# Build System

## Vite Configuration

### Unified Build System

The project uses **Vite for both development and production builds** (no separate Rollup configuration).

**Location**: `vite.config.ts`

### Build Configuration

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        assetFileNames: '[name][extname]',
        entryFileNames: 'app.js',
        chunkFileNames: ({ name }) => getChunkFileName(name),
      },
    },
  },
})
```

### Chunk Naming for Analytics

Override output chunk names for analytics tracking:

```typescript
function getChunkFileName(name: string) {
  switch (name) {
    case 'custom-main-modal':
      return 'x-empty-search-[hash].js'
    case 'index':
      return 'x-search-[hash].js'
    default:
      return '[name]-[hash].js'
  }
}
```

### CSS Injection Pattern

Uses `vite-plugin-css-injected-by-js` with custom CSS injector:

```typescript
cssInjectedByJsPlugin({
  injectCodeFunction: cssCode => {
    // Normalize CSS for Shadow DOM compatibility
    const normalizedCssCodeForShadowRoot = cssCode
      .replaceAll('((-webkit-hyphens:none)) and ', '') // BUILD
      .replaceAll('(-webkit-hyphens: none) and ', '') // DEV
    return window.xCSSInjector.addStyle({ source: normalizedCssCodeForShadowRoot })
  },
  topExecutionPriority: false, // Wait until `window.xCSSInjector` is created
  dev: { enableDev: true },
})
```

This ensures CSS is properly injected into Shadow DOM when `isolate: true`.

### X Components CSS Injector Override

Custom plugin overrides X Components' CSS injector:

```typescript
function overrideXCssInjector(): PluginOption {
  return {
    name: 'override-x-css-injector',
    enforce: 'pre',
    transform(code: string, id: string) {
      const stringInjector = '(cssCode) => window.xCSSInjector.addStyle({ source: cssCode });'
      /* Replace the X CSS injector by xCSSInjector for both BUILD and DEV */
      if (id.includes('node_modules/@empathyco/x-components/tools/inject-css.js')) {
        return code.replace('export default injectCss', `export default ${stringInjector}`)
      }
      if (code.includes('// node_modules/@empathyco/x-components/tools/inject-css.js')) {
        return code.replace(
          'var inject_css_default = injectCss;',
          `var inject_css_default = ${stringInjector}`,
        )
      }
    },
  }
}
```

## Dev vs Production

### Development Mode

- **Command**: `npm run serve`
- **Features**:
  - Fast HMR (Hot Module Replacement)
  - Source maps enabled
  - CSS injected with dev mode support
- **Server**: `localhost:8080`

### Production Build

- **Command**: `npm run build`
- **Features**:
  - Code splitting for optimal loading
  - Minification enabled
  - Optimized chunks with semantic naming
  - Tree shaking for unused code removal
  - CSS normalized for Shadow DOM
- **Output**: `dist/`

### Build and Preview

Test production build locally:

```bash
npm run build
npm run serve:preview  # Serves dist/ folder
```

## Environment Configuration

### Docker Development

Set environment variable to use docker endpoints (if docker.adapter.ts exists):

```bash
VITE_APP_DEVELOPMENT_DOCKER=true npm run build
# or
npm run build:docker
```

This activates `src/adapter/docker.adapter.ts` which overrides API endpoints.

### Production Build

Default build uses production endpoints from `src/adapter/adapter.ts`.

## Bundle Analysis

Vite includes Rollup visualizer plugin for bundle analysis:

```typescript
import visualizer from 'rollup-plugin-visualizer'

plugins: [
  // ...other plugins
  visualizer(),
]
```

Run build to generate `stats.html` with bundle composition visualization.
