import type { ExperienceControlsState } from '@empathyco/x-components/experience-controls'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { initCustomization } from './customization'

const addStyleSpy = vi.spyOn(window.xCSSInjector, 'addStyle')

describe('initCustomization', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should inject styles with xds prefix', () => {
    const xControlsState = {
      controls: {
        styles: {
          font: {
            'font-family': 'Helvetica',
            'font-size': '16px',
          },
          spacing: {
            'spacing-md': '16px',
            'spacing-lg': '24px',
          },
        },
      },
    } as unknown as ExperienceControlsState

    initCustomization(xControlsState)

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toMatch(/^:root,:host/)
    expect(callArg.source).toContain('--xds-font-family:Helvetica')
    expect(callArg.source).toContain('--xds-font-size:16px')
    expect(callArg.source).toContain('--xds-spacing-md:16px')
    expect(callArg.source).toContain('--xds-spacing-lg:24px')
  })

  it('should inject color styles with three variants (base, lighter, darker)', () => {
    const xControlsState = {
      controls: {
        styles: {
          colors: {
            brand: '#AABBCC',
            accent: '#FF5733',
          },
        },
      },
    } as unknown as ExperienceControlsState

    initCustomization(xControlsState)

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toContain('--xds-brand-50:#AABBCC')
    expect(callArg.source).toContain('--xds-brand-25:color-mix(in srgb, #AABBCC 50%, white)')
    expect(callArg.source).toContain('--xds-brand-75:color-mix(in srgb, #AABBCC 50%, black)')

    expect(callArg.source).toContain('--xds-accent-50:#FF5733')
    expect(callArg.source).toContain('--xds-accent-25:color-mix(in srgb, #FF5733 50%, white)')
    expect(callArg.source).toContain('--xds-accent-75:color-mix(in srgb, #FF5733 50%, black)')
  })
})
