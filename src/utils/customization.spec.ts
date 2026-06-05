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
          colors: {
            brand: '#AABBCC',
          },
          font: {
            'font-family': 'Helvetica',
          },
          spacing: {
            'spacing-md': '16px',
          },
        },
      },
    } as unknown as ExperienceControlsState

    initCustomization(xControlsState)

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    expect(callArg.source).toContain('--xds-brand:#AABBCC')
    expect(callArg.source).toContain('--xds-font-family:Helvetica')
    expect(callArg.source).toContain('--xds-spacing-md:16px')
  })
})
