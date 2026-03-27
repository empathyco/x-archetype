# Development Workflows

## Essential Commands

```bash
npm run serve              # Dev server (localhost:8080)
npm run serve:docker       # Dev with docker endpoints
npm run build              # Production build via Rollup
npm run test:e2e           # Cypress with Cucumber BDD
npm run typecheck          # Vue TSC type checking
```

## Local X Components Development

```bash
npm run install:local                    # Install local x-components build
npm run install:adapter-platform:local   # Install local adapter
npm run install:xds:local                # Install local x-tailwindcss
```

These commands find the latest `.tgz` in `../x/packages/*/` - requires X monorepo at `../x/`

## Testing

### E2E Testing

- **Framework**: Cypress with Cucumber BDD
- **Location**: `tests/e2e/cucumber/` (`.feature` + `.spec.ts` pairs)
- **Mocked responses**: `tests/e2e/cucumber/mocked-responses.spec.ts` for fixture data
- **Interactive**: `npm run cy:open`
- **CI**: `npm run cy:run`

### Running Specific Scenarios

Use Cypress tags to filter scenarios:

```bash
npm run cy:run -- --env TAGS="@smoke"
npm run cy:run -- --env TAGS="not @skip"
```

## Docker Development

Set `VUE_APP_DEVELOPMENT_DOCKER=true` to use docker adapter endpoints:

```bash
npm run serve:docker
```

This activates `src/adapter/docker.adapter.ts` which overrides API endpoints.
