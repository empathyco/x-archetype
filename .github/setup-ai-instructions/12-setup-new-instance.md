# Setup New Instance from X Archetype

This guide provides step-by-step instructions for creating a new search experience from the X Archetype codebase.

## Prerequisites

Before starting, gather the following required configuration values from the user:

1. **Default Language** (`lang`): The default language code (e.g., `en`, `es`, `fr`)
2. **Default Currency** (`currency`): The default currency code (e.g., `USD`, `EUR`, `GBP`)
3. **Default View Mode** (`viewMode`): The default view mode (possible values: `fullScreen` or `embedded`)
4. **Platform** (`adapter`): Is it a Vtex platform integration? (yes/no)

**⚠️ IMPORTANT**: If the user has not provided these values, you MUST ask for them before proceeding with any modifications.

## Repository Context

Determine the repository name (e.g., `x-brand`). This will be used throughout the setup process.

- **Instance Name**: Repository name without the `x-` prefix (e.g., `brand` from `x-brand`)
- **Instance Display Name**: Capitalized instance name (e.g., `Brand` from `brand`)

## Step 1: Clean Up GitHub Configuration

### Delete Archetype-Specific Files and Folders

Remove the following from the `.github/` directory:

**Folders to delete:**

- `.github/cloudflare-r2/`
- `.github/frontend-deploy/`
- `.github/ISSUE_TEMPLATE/`

**Workflow files to delete:**

- `.github/workflows/build-archetype.yml`
- `.github/workflows/pull-request-archetype.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/deploy-docker.yml`

**Other files to delete:**

- `.github/code_of_conduct.md`
- `.github/pull_request_template.md`

### Enable Instance Workflows

The following workflow files exist but are disabled with `if: false`. Enable them by removing the condition:

**File: `.github/workflows/build.yml`**

```yaml
jobs:
  build:
    if: false # Remove this entire line
    uses: empathyco/platform-reusable-github-actions/.github/workflows/x-archetype-build.yml@main
    secrets: inherit
```

**File: `.github/workflows/pull-request.yml`**

```yaml
jobs:
  pr-preview:
    if: false # Remove this entire line
    uses: empathyco/platform-reusable-github-actions/.github/workflows/x-archetype-pr-preview.yml@main
    secrets: inherit
```

After removal, the jobs should look like:

```yaml
jobs:
  build:
    uses: empathyco/platform-reusable-github-actions/.github/workflows/x-archetype-build.yml@main
    secrets: inherit
```

## Step 2: Configure Snippet Script

Edit `/public/snippet-script.js`:

### Modify Instance Fallback

```javascript
// Change this:
const instance = popFromURLParameters('instance') || 'empathy'

// To this (replace 'empathy' with actual instance name):
const instance = popFromURLParameters('instance') || 'brand'
```

**Pattern**: Use repository name without the `x-` prefix.

- Repository: `x-brand` → Instance: `brand`

### Modify Language Fallback

```javascript
// Change from archetype default to user-provided language:
const lang = popFromURLParameters('lang') || 'en' // Use user-provided lang
```

### Modify Currency Fallback

```javascript
// Change from archetype default to user-provided currency:
const currency = popFromURLParameters('currency') || 'EUR' // Use user-provided currency
```

### Set Queries Preview to Empty Array

Find the `queriesPreview` property inside the `window.initX` object and change it from an array with sample queries to an empty array:

```javascript
// Change from this:
queriesPreview: [
  {
    query: 'dress',
    title: 'Autumn dresses by Marni',
    filters: ['brand:marni', 'categoryIds:12fad53d7'],
  },
  {
    query: 'belted legging',
    filters: ['categoryIds:1b5f82125'],
    title: 'Belted leggings',
  },
  // ... more query objects
],

// To this:
queriesPreview: [],
```

This removes all the sample preview queries from the archetype.

### Modify View Mode Fallback

```javascript
// Change from archetype default to user-provided viewMode:
const viewMode = popFromURLParameters('viewMode') || 'fullScreen' // Use user-provided viewMode
```

## Step 3: Clean Up Adapter Configuration

### Delete Docker Adapter

Remove the file:

- `src/adapter/docker.adapter.ts`

### Modify Main Adapter

Edit `src/adapter/adapter.ts`:

**1. Configure Result Schema Based on Platform**

If the platform is **VTEX** (user answered "yes" to prerequisite #4):

```typescript
// Change the import:
import { vtexResultSchema } from './result/vtex-result-schema'

// Change the resultSchema override:
resultSchema.$override<any, Partial<Result>>(vtexResultSchema)
```

If the platform is **NOT VTEX** (user answered "no" to prerequisite #4):

```typescript
// Keep the existing import:
import { platformResultSchema } from './result/platform-result-schema'

// Keep the existing resultSchema override:
resultSchema.$override<any, Partial<Result>>(platformResultSchema)
```

> **Note**: The archetype uses `platformResultSchema` by default. Only change to `vtexResultSchema` for VTEX integrations.

**2. Remove Related Prompts Extension**

Find and remove the line that extends `adapter.relatedPrompts`:

```typescript
// Remove this or similar implementation that extends relatedPrompts:
adapter.relatedPrompts = relatedPromptsEndpointAdapter.extends({
  endpoint: '...',
  requestMapper: ({ query }) => ({ query }),
})
```

This is typically found after the schema overrides in the adapter configuration.

## Step 4: Remove Root-Level Files

Delete the following files from the project root:

- `Dockerfile`
- `renovate.json`

## Step 5: Remove Docker Development Environment Code

### Remove Docker Variable from Build Configuration

Edit `build/instrumentation.build.mjs` and remove the Docker environment variable replacement:

**Find and remove these lines:**

```javascript
'process.env.VUE_APP_DEVELOPMENT_DOCKER': JSON.stringify(
  !!process.env.VUE_APP_DEVELOPMENT_DOCKER,
),
```

This is typically found within the `replace()` plugin configuration around line 80.

### Remove Docker Condition from Plugin Options

Edit `src/x-components/plugin.options.ts` and remove the entire Docker development condition:

**Find and remove the entire if block:**

```typescript
if (process.env.VUE_APP_DEVELOPMENT_DOCKER) {
  const { overrideAdapter } = await import('../adapter/docker.adapter')
  overrideAdapter(adapter)
  ;(window.initX as SnippetConfig).queriesPreview = [
    {
      query: 'short',
      title: 'Short',
    },
    {
      query: 'comedy',
      title: 'Comedy',
    },
    {
      query: 'family',
      title: 'Family',
    },
  ]
}
```

This block is typically found at the beginning of the `getInstallXOptions()` function around line 38.

## Step 6: Update Package Configuration

Edit `package.json`:

### Update Package Name

```json
{
  "name": "@empathyco/x-archetype" // Replace 'archetype' with instance name
}
```

**Pattern**: `@empathyco/x-{instance-name}`

### Update Description

```json
{
  "description": "Archetype integration with X Components" // Replace 'Archetype' with Instance Display Name
}
```

**Pattern**: `"{Instance Display Name} integration with X Components"`

Examples:

- `x-empathy` → `"Empathy integration with X Components"`
- `x-brand` → `"Brand integration with X Components"`

## Verification Checklist

After completing all steps, verify:

- [ ] All specified `.github/` files and folders have been deleted
- [ ] Build and pull-request workflows are enabled (removed `if: false`)
- [ ] `snippet-script.js` has correct instance, lang, currency, and viewMode fallbacks
- [ ] `queriesPreview` is set to empty array
- [ ] `docker.adapter.ts` has been removed
- [ ] `adapter.ts` uses correct result schema (vtexResultSchema for VTEX, platformResultSchema otherwise)
- [ ] `adapter.relatedPrompts` extension has been removed from `adapter.ts`
- [ ] `Dockerfile` and `renovate.json` have been deleted
- [ ] Docker variable replacement removed from `build/instrumentation.build.mjs`
- [ ] Docker development condition removed from `src/x-components/plugin.options.ts`
- [ ] `package.json` has correct name and description

## Example: Setting Up x-brand

Given repository name: `x-brand`
User provided:

- Language: `en`
- Currency: `USD`
- View Mode: `embedded`
- Platform: `no` (not VTEX)

**Derived values:**

- Instance name: `brand`
- Instance display name: `Brand`

**Results:**

- `snippet-script.js` instance fallback: `'brand'`
- `snippet-script.js` lang fallback: `'en'`
- `snippet-script.js` currency fallback: `'USD'`
- `snippet-script.js` viewMode fallback: `'embedded'`
- `adapter.ts` uses: `platformResultSchema`
- `package.json` name: `"@empathyco/x-brand"`
- `package.json` description: `"Brand integration with X Components"`

## Example: Setting Up x-brand-vtex (VTEX Platform)

Given repository name: `x-brand-vtex`
User provided:

- Language: `pt`
- Currency: `BRL`
- View Mode: `embedded`
- Platform: `yes` (VTEX)

**Derived values:**

- Instance name: `brand-vtex`
- Instance display name: `Brand Vtex`

**Results:**

- `snippet-script.js` instance fallback: `'brand-vtex'`
- `snippet-script.js` lang fallback: `'pt'`
- `snippet-script.js` currency fallback: `'BRL'`
- `snippet-script.js` viewMode fallback: `'embedded'`
- `adapter.ts` uses: `vtexResultSchema` (imported from `./result/vtex-result-schema`)
- `package.json` name: `"@empathyco/x-brand-vtex"`
- `package.json` description: `"Brand Vtex integration with X Components"`

## Notes

- **Always confirm** the repository name before making changes
- **Always ask** for lang, currency, viewMode, and platform if not provided
- **Back up** the codebase before performing these operations
- This guide is specifically for setting up NEW instances from the archetype
- For production deployments, see [Development Workflows](./06-development-workflows.md)
