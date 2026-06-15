import { beforeEach, describe, expect, it, vi } from 'vitest'
import BaseResult from '../components/results/base-result.vue'

const PerfumesclubResult = { name: 'PerfumesclubResult', template: '<div>Mock Result</div>' }

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
  default: 'BaseResult',
}))

vi.mock('../instance-extensions/perfumesclub/perfumesclub-empty-search.ts', () => ({
  Result: PerfumesclubResult,
}))

describe('useInstanceExtensions composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('should set up the result component correctly', async () => {
    const { useInstanceExtensions } = await import('./use-instance-extensions.composable')
    useInstanceExtensions()

    expect(defineAsyncComponentMock).toHaveBeenCalledTimes(1)

    // eslint-disable-next-line ts/no-unsafe-assignment
    const options = defineAsyncComponentMock.mock.calls[0][0]
    expect(options).toHaveProperty('loader')
    expect(options).toHaveProperty('loadingComponent', BaseResult)
    expect(options).toHaveProperty('errorComponent', BaseResult)
    expect(options).toHaveProperty('timeout', 3000)
    expect(options).toHaveProperty('delay', 0)

    // eslint-disable-next-line ts/no-unsafe-assignment, ts/no-unsafe-member-access, ts/no-unsafe-call
    const loaderResult = await options.loader()
    expect(loaderResult).toBe(PerfumesclubResult)
  })
})
