import type { XControlsState } from '../x-components/xcontrols'
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

const defaultControls: XControlsState['controls'] = {
  aiSearchFallback: true,
  fullPredictiveLayer: false,
  facetsPanelOverlay: true,
  logo: 'https://example.com/logo.svg',
  gridConfig: {
    columnPicker: true,
    listMode: true,
    columnSelector: ['5', '2'],
  },
  colors: {
    lead: '#FF0000',
    auxiliary: '#00FF00',
    font: '#0000FF',
  },
  styles: {
    'font-family-main': 'Arial',
    'font-weight-bold': '700',
  },
}

describe('useCustomization composable', () => {
  let controlsRef: ReturnType<typeof ref<XControlsState>>
  let addStyleSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.restoreAllMocks()

    controlsRef = ref<XControlsState>({
      controls: defaultControls,
    })

    useStateMock.mockReturnValue({
      controls: computed(() => controlsRef.value),
    })

    addStyleSpy = vi.spyOn(window.xCSSInjector, 'addStyle')
  })

  it('should initialize and watch for color changes', async () => {
    const { init } = useCustomization()
    init()

    const colors = {
      lead: '#112233',
      auxiliary: '#445566',
      font: '#778899',
    }

    controlsRef.value = {
      ...controlsRef.value,
      controls: {
        ...controlsRef.value!.controls,
        colors,
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(`--xds-color-lead-50:${colors.lead}`) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-auxiliary-50:${colors.auxiliary}`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(`--xds-color-font-50:${colors.font}`) as unknown as string,
      }),
    )
  })

  it('should generate correct color variants with white and black mixing', async () => {
    const { init } = useCustomization()
    init()

    const colors = {
      lead: '#FF0000',
      auxiliary: '#00FF00',
      font: '#0000FF',
    }

    controlsRef.value = {
      ...controlsRef.value,
      controls: {
        ...controlsRef.value!.controls,
        colors,
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(`--xds-color-lead-50:${colors.lead}`) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-auxiliary-50:${colors.auxiliary}`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(`--xds-color-font-50:${colors.font}`) as unknown as string,
      }),
    )

    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-lead-25:color-mix(in srgb, ${colors.lead} 50%, white)`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-auxiliary-25:color-mix(in srgb, ${colors.auxiliary} 50%, white)`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-font-25:color-mix(in srgb, ${colors.font} 50%, white)`,
        ) as unknown as string,
      }),
    )

    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-lead-75:color-mix(in srgb, ${colors.lead} 50%, black)`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-auxiliary-75:color-mix(in srgb, ${colors.auxiliary} 50%, black)`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-color-font-75:color-mix(in srgb, ${colors.font} 50%, black)`,
        ) as unknown as string,
      }),
    )
  })

  it('should handle custom styles and inject them correctly', async () => {
    const { init } = useCustomization()
    init()

    const styles = {
      'font-family-main': 'Helvetica',
      'font-weight-regular': '400',
      'border-radius-lg': '8px',
    }

    controlsRef.value = {
      ...controlsRef.value,
      controls: {
        ...controlsRef.value!.controls,
        styles,
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-font-family-main:${styles['font-family-main']}`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-font-weight-regular:${styles['font-weight-regular']}`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-border-radius-lg:${styles['border-radius-lg']}`,
        ) as unknown as string,
      }),
    )
  })

  it('should inject both styles and colors when both are present', async () => {
    const { init } = useCustomization()
    init()

    const colors = {
      lead: '#AABBCC',
      auxiliary: '#DDEEFF',
      font: '#112233',
    }
    const styles = {
      'font-size-base': '16px',
    }

    controlsRef.value = {
      ...controlsRef.value,
      controls: {
        ...controlsRef.value!.controls,
        colors,
        styles,
      },
    }

    await nextTick()

    expect(addStyleSpy).toHaveBeenCalledTimes(2)
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(
          `--xds-font-size-base:${styles['font-size-base']}`,
        ) as unknown as string,
      }),
    )
    expect(addStyleSpy).toHaveBeenCalledWith(
      expect.objectContaining<{ source: string }>({
        source: expect.stringContaining(`--xds-color-lead-50:${colors.lead}`) as unknown as string,
      }),
    )
  })
})
