import type { EffectScope } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { useCustomization } from './use-customization.composable'

const defaultControls = {
  aiSearchFallback: true,
  fullPredictiveLayer: false,
  facetsPanelOverlay: true,
  logo: 'https://example.com/logo.svg',
  gridConfig: {
    columnPicker: true,
    listMode: true,
    columnSelector: ['5', '2'],
  },
  styles: {
    colors: {
      lead: '#FF0000',
      auxiliary: '#00FF00',
      font: '#0000FF',
    },
    font: {
      'font-family-main': 'Arial',
      'font-weight-bold': '700',
    },
  } as Record<string, any>,
}

const xControlsStateStub = ref({
  controls: defaultControls,
})

const useStateMock = vi.hoisted(() => vi.fn(() => ({ controls: xControlsStateStub })))

vi.mock('@empathyco/x-components', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('@empathyco/x-components')>()),
    useState: useStateMock,
  }
})

const addStyleSpy = vi.spyOn(window.xCSSInjector, 'addStyle')

describe('useCustomization composable', () => {
  let scope: EffectScope // wrap the composable so we can stop the inner watcher before each unit test.

  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()

    scope = effectScope()
    xControlsStateStub.value = { controls: defaultControls }
  })

  afterEach(() => {
    scope.stop()
  })

  it('should handle colors block with variants generation', async () => {
    scope.run(() => {
      const { init } = useCustomization()
      init()
    })

    const colors = {
      lead: '#112233',
      auxiliary: '#445566',
      font: '#778899',
    }

    xControlsStateStub.value = {
      controls: {
        ...defaultControls,
        styles: {
          colors,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)

    const callArg = addStyleSpy.mock.calls[0][0]
    expect(callArg.source).toContain(`--xds-lead-50:${colors.lead}`)
    expect(callArg.source).toContain(`--xds-auxiliary-50:${colors.auxiliary}`)
    expect(callArg.source).toContain(`--xds-font-50:${colors.font}`)

    expect(callArg.source).toContain(`--xds-lead-25:color-mix(in srgb, ${colors.lead} 50%, white)`)
    expect(callArg.source).toContain(`--xds-lead-75:color-mix(in srgb, ${colors.lead} 50%, black)`)
  })

  it('should generate all color variants (-25, -50, -75) for each color', async () => {
    scope.run(() => {
      const { init } = useCustomization()
      init()
    })

    const colors = {
      lead: '#FF0000',
      auxiliary: '#00FF00',
      font: '#0000FF',
    }

    xControlsStateStub.value = {
      controls: {
        ...defaultControls,
        styles: {
          colors,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toContain(`--xds-lead-50:${colors.lead}`)
    expect(callArg.source).toContain(`--xds-auxiliary-50:${colors.auxiliary}`)
    expect(callArg.source).toContain(`--xds-font-50:${colors.font}`)
    expect(callArg.source).toContain(`--xds-lead-25:color-mix(in srgb, ${colors.lead} 50%, white)`)
    expect(callArg.source).toContain(
      `--xds-auxiliary-25:color-mix(in srgb, ${colors.auxiliary} 50%, white)`,
    )
    expect(callArg.source).toContain(`--xds-font-25:color-mix(in srgb, ${colors.font} 50%, white)`)
    expect(callArg.source).toContain(`--xds-lead-75:color-mix(in srgb, ${colors.lead} 50%, black)`)
    expect(callArg.source).toContain(
      `--xds-auxiliary-75:color-mix(in srgb, ${colors.auxiliary} 50%, black)`,
    )
    expect(callArg.source).toContain(`--xds-font-75:color-mix(in srgb, ${colors.font} 50%, black)`)
  })

  it('should handle non-color blocks using mapCustomizationStylesToCSS', async () => {
    scope.run(() => {
      const { init } = useCustomization()
      init()
    })

    const font = {
      'font-family-main': 'Helvetica',
      'font-weight-regular': '400',
    }
    const spacing = {
      'spacing-sm': '8px',
      'spacing-md': '16px',
    }

    xControlsStateStub.value = {
      controls: {
        ...defaultControls,
        styles: {
          font,
          spacing,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toContain(`--xds-font-family-main:${font['font-family-main']}`)
    expect(callArg.source).toContain(`--xds-font-weight-regular:${font['font-weight-regular']}`)
    expect(callArg.source).toContain(`--xds-spacing-sm:${spacing['spacing-sm']}`)
    expect(callArg.source).toContain(`--xds-spacing-md:${spacing['spacing-md']}`)
  })

  it('should combine colors block and non-color blocks in a single injection', async () => {
    scope.run(() => {
      const { init } = useCustomization()
      init()
    })

    const colors = {
      lead: '#AABBCC',
      auxiliary: '#DDEEFF',
    }
    const font = {
      'font-size-base': '16px',
      'line-height-base': '1.5',
    }

    xControlsStateStub.value = {
      controls: {
        ...defaultControls,
        styles: {
          colors,
          font,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toContain(`--xds-lead-50:${colors.lead}`)
    expect(callArg.source).toContain(`--xds-auxiliary-50:${colors.auxiliary}`)
    expect(callArg.source).toContain(`--xds-font-size-base:${font['font-size-base']}`)
    expect(callArg.source).toContain(`--xds-line-height-base:${font['line-height-base']}`)
  })

  it('should not inject styles when xdsStyles is empty (no object values)', async () => {
    scope.run(() => {
      const { init } = useCustomization()
      init()
    })

    xControlsStateStub.value = {
      controls: {
        ...defaultControls,
        styles: {
          stringValue: 'some-string',
          numberValue: 123,
          booleanValue: true,
          nullValue: null,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).not.toHaveBeenCalled()
  })

  it('should filter out non-object values and only process object blocks', async () => {
    scope.run(() => {
      const { init } = useCustomization()
      init()
    })

    const font = {
      'font-family': 'Arial',
    }

    xControlsStateStub.value = {
      controls: {
        ...defaultControls,
        styles: {
          font,
          stringValue: 'ignored',
          numberValue: 42,
          booleanValue: false,
          nullValue: null,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toContain(`--xds-font-family:${font['font-family']}`)

    expect(callArg.source).not.toContain('ignored')
    expect(callArg.source).not.toContain('42')
  })
})
