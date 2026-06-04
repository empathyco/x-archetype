import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed, nextTick, ref } from 'vue'
import { useCustomization } from './use-customization.composable'

const useStateMock = vi.hoisted(() => vi.fn())
vi.mock('@empathyco/x-components', async importOriginal => {
  return {
    ...(await importOriginal<typeof import('@empathyco/x-components')>()),
    useState: useStateMock,
  }
})

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
    typography: {
      'font-family-main': 'Arial',
      'font-weight-bold': '700',
    },
  },
}

describe('useCustomization composable', () => {
  let controlsRef: ReturnType<typeof ref<any>>
  let addStyleSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()

    controlsRef = ref({
      controls: defaultControls,
    })

    useStateMock.mockReturnValue({
      // eslint-disable-next-line ts/no-unsafe-return
      controls: computed(() => controlsRef.value),
    })

    addStyleSpy = vi.spyOn(window.xCSSInjector, 'addStyle')
  })

  it('should handle colors block with variants generation', async () => {
    const { init } = useCustomization()
    init()

    const colors = {
      lead: '#112233',
      auxiliary: '#445566',
      font: '#778899',
    }

    controlsRef.value = {
      controls: {
        ...defaultControls,
        styles: {
          colors,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)

    const callArg = addStyleSpy.mock.calls[0][0] as { source: string }
    expect(callArg.source).toContain(`--xds-lead-50:${colors.lead}`)
    expect(callArg.source).toContain(`--xds-auxiliary-50:${colors.auxiliary}`)
    expect(callArg.source).toContain(`--xds-font-50:${colors.font}`)

    expect(callArg.source).toContain(`--xds-lead-25:color-mix(in srgb, ${colors.lead} 50%, white)`)
    expect(callArg.source).toContain(`--xds-lead-75:color-mix(in srgb, ${colors.lead} 50%, black)`)
  })

  it('should generate all color variants (-25, -50, -75) for each color', async () => {
    const { init } = useCustomization()
    init()

    const colors = {
      lead: '#FF0000',
      auxiliary: '#00FF00',
      font: '#0000FF',
    }

    controlsRef.value = {
      controls: {
        ...defaultControls,
        styles: {
          colors,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0] as { source: string }

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
    const { init } = useCustomization()
    init()

    const typography = {
      'font-family-main': 'Helvetica',
      'font-weight-regular': '400',
    }
    const spacing = {
      'spacing-sm': '8px',
      'spacing-md': '16px',
    }

    controlsRef.value = {
      controls: {
        ...defaultControls,
        styles: {
          typography,
          spacing,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0] as { source: string }

    expect(callArg.source).toContain(`--xds-font-family-main:${typography['font-family-main']}`)
    expect(callArg.source).toContain(
      `--xds-font-weight-regular:${typography['font-weight-regular']}`,
    )
    expect(callArg.source).toContain(`--xds-spacing-sm:${spacing['spacing-sm']}`)
    expect(callArg.source).toContain(`--xds-spacing-md:${spacing['spacing-md']}`)
  })

  it('should combine colors block and non-color blocks in a single injection', async () => {
    const { init } = useCustomization()
    init()

    const colors = {
      lead: '#AABBCC',
      auxiliary: '#DDEEFF',
    }
    const typography = {
      'font-size-base': '16px',
      'line-height-base': '1.5',
    }

    controlsRef.value = {
      controls: {
        ...defaultControls,
        styles: {
          colors,
          typography,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0] as { source: string }

    expect(callArg.source).toContain(`--xds-lead-50:${colors.lead}`)
    expect(callArg.source).toContain(`--xds-auxiliary-50:${colors.auxiliary}`)
    expect(callArg.source).toContain(`--xds-font-size-base:${typography['font-size-base']}`)
    expect(callArg.source).toContain(`--xds-line-height-base:${typography['line-height-base']}`)
  })

  it('should not inject styles when xdsStyles is empty (no object values)', async () => {
    const { init } = useCustomization()
    init()

    controlsRef.value = {
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
    const { init } = useCustomization()
    init()

    const typography = {
      'font-family': 'Arial',
    }

    controlsRef.value = {
      controls: {
        ...defaultControls,
        styles: {
          typography,
          stringValue: 'ignored',
          numberValue: 42,
          booleanValue: false,
          nullValue: null,
        },
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0] as { source: string }

    expect(callArg.source).toContain(`--xds-font-family:${typography['font-family']}`)

    expect(callArg.source).not.toContain('ignored')
    expect(callArg.source).not.toContain('42')
  })
})
