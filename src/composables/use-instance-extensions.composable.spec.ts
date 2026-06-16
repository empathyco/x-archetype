import { beforeEach, describe, expect, it, vi } from 'vitest'

const PerfumesclubResult = { name: 'PerfumesclubResult', template: '<div>Mock Result</div>' }
const PerfumesclubBagIcon = { name: 'PerfumesclubBagIcon', template: '<div>Mock BagIcon</div>' }

const snippetConfigStub = { instance: 'perfumesclub' }
const defineAsyncComponentMock = vi.fn()
vi.mock('vue', async importOriginal => {
  const actual = await importOriginal<typeof import('vue')>()
  return {
    ...actual,
    inject: vi.fn((key: string) => {
      if (key === 'snippetConfig') {
        return snippetConfigStub
      }
      return undefined
    }),
    defineAsyncComponent: defineAsyncComponentMock,
  }
})

vi.mock('../components/results/base-result.vue', () => ({
  default: { name: 'BaseResult' },
}))

vi.mock('../components/icons/bag-icon.vue', () => ({
  default: { name: 'BagIcon' },
}))

vi.mock('../instance-extensions/perfumesclub/perfumesclub-empty-search.ts', () => ({
  Result: PerfumesclubResult,
  BagIcon: PerfumesclubBagIcon,
}))

// Async component options structure that every component should have
interface AsyncComponentOptions {
  loader: () => Promise<any>
  loadingComponent: any
  errorComponent: any
  timeout: number
  delay: number
}

// Generic validation for any async component configuration
async function validateAsyncComponentOptions(options: AsyncComponentOptions) {
  expect(options).toHaveProperty('loader')
  expect(options).toHaveProperty('loadingComponent')
  expect(options).toHaveProperty('errorComponent')
  expect(options).toHaveProperty('timeout', 3000)
  expect(options).toHaveProperty('delay', 0)

  // Test that the loader is a function that resolves correctly
  expect(options.loader).toBeTypeOf('function')

  // eslint-disable-next-line ts/no-unsafe-assignment
  const resolved = await options.loader()
  expect(resolved).toBeDefined()
}

describe('useInstanceExtensions composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should set up all async components correctly', async () => {
    const { useInstanceExtensions } = await import('./use-instance-extensions.composable')
    const result = useInstanceExtensions()

    // Verify the composable returns an object with expected component keys
    expect(result).toHaveProperty('bagIcon')
    expect(result).toHaveProperty('resultComponent')

    // Get all async component configurations from the mock calls
    const asyncComponentOptions = defineAsyncComponentMock.mock.calls.map(
      (call: any[]) => call[0] as AsyncComponentOptions,
    )

    // Validate each async component has the correct structure and loads correctly
    for (const options of asyncComponentOptions) {
      await validateAsyncComponentOptions(options)
    }
  })
})
