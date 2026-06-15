import { beforeEach, describe, expect, it, vi } from 'vitest'

const getInstallXOptionsMock = vi.fn(async () => Promise.resolve({}))

vi.mock('./x-components/plugin.options', () => ({
  getInstallXOptions: getInstallXOptionsMock,
}))

describe('main', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('should call getInstallXOptions on initialization', async () => {
    vi.doMock('@empathyco/x-archetype-utils', () => ({
      CssInjector: class {
        constructor() {}
      },
    }))

    vi.doMock('@empathyco/x-components', async () => {
      const actual = await vi.importActual('@empathyco/x-components')
      return {
        ...actual,
        XInstaller: class {
          constructor() {}
          async init() {
            return Promise.resolve()
          }
        },
      }
    })

    // @ts-expect-error - Window extension for testing
    window.initX = { instance: 'default' }
    // @ts-expect-error - Window extension for testing
    delete window.xComponents

    vi.resetModules()

    await import('./main')

    expect(getInstallXOptionsMock).toHaveBeenCalled()
  })

  it('should create CssInjector with injectImmediately flag set to true', async () => {
    let cssInjectorCalled = false

    vi.doMock('@empathyco/x-archetype-utils', () => ({
      CssInjector: class {
        constructor(injectImmediately: boolean) {
          cssInjectorCalled = injectImmediately
        }
      },
    }))

    vi.doMock('@empathyco/x-components', async () => {
      const actual = await vi.importActual('@empathyco/x-components')
      return {
        ...actual,
        XInstaller: class {
          constructor() {}
          async init() {
            return Promise.resolve()
          }
        },
      }
    })

    // @ts-expect-error - Window extension for testing
    window.initX = { instance: 'default' }
    // @ts-expect-error - Window extension for testing
    delete window.xComponents

    vi.resetModules()

    await import('./main')

    expect(cssInjectorCalled).toBeTruthy()
  })

  it('should handle XInstaller initialization successfully', async () => {
    let xInstallerCalled = false

    vi.doMock('@empathyco/x-archetype-utils', () => ({
      CssInjector: class {
        constructor() {}
      },
    }))

    vi.doMock('@empathyco/x-components', async () => {
      const actual = await vi.importActual('@empathyco/x-components')
      return {
        ...actual,
        XInstaller: class {
          constructor() {
            xInstallerCalled = true
          }
          async init() {
            return Promise.resolve()
          }
        },
      }
    })

    // @ts-expect-error - Window extension for testing
    window.initX = { instance: 'default' }
    // @ts-expect-error - Window extension for testing
    delete window.xComponents

    vi.resetModules()

    await import('./main')

    expect(xInstallerCalled).toBeTruthy()
  })

  it('should log error if initialization fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const errorMessage = 'Test error'

    vi.doMock('./x-components/plugin.options', () => ({
      getInstallXOptions: async () => Promise.reject(new Error(errorMessage)),
    }))

    vi.resetModules()

    await import('./main')

    expect(consoleSpy).toHaveBeenCalledWith('Error initializing XInstaller:', expect.any(Error))
  })
})
