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
            lead: '#FF0000',
            auxiliary: '#00FF00',
          },
          font: {
            'font-family-main': 'Arial',
            'font-weight-bold': '700',
          },
        },
      },
    } as unknown as ExperienceControlsState

    initCustomization(xControlsState)

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    // All styles should have xds prefix
    expect(callArg.source).toContain('--xds-lead:#FF0000')
    expect(callArg.source).toContain('--xds-auxiliary:#00FF00')
    expect(callArg.source).toContain('--xds-font-family-main:Arial')
    expect(callArg.source).toContain('--xds-font-weight-bold:700')

    // Check it's wrapped in :root,:host
    expect(callArg.source).toMatch(/^:root,:host\{.*\}$/)
  })

  it('should combine multiple style blocks in single injection', () => {
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

    // Should contain styles from all blocks
    expect(callArg.source).toContain('--xds-brand:#AABBCC')
    expect(callArg.source).toContain('--xds-font-family:Helvetica')
    expect(callArg.source).toContain('--xds-spacing-md:16px')
  })

  it('should filter out non-object values from styles', () => {
    const xControlsState = {
      controls: {
        styles: {
          colors: {
            lead: '#FF0000',
          },
          font: {
            'font-family': 'Arial',
          },
          stringValue: 'should-be-ignored',
          numberValue: 42,
          booleanValue: true,
          nullValue: null,
        },
      },
    } as unknown as ExperienceControlsState

    initCustomization(xControlsState)

    expect(addStyleSpy).toHaveBeenCalledTimes(1)
    const callArg = addStyleSpy.mock.calls[0][0]

    // Should contain valid styles
    expect(callArg.source).toContain('--xds-lead:#FF0000')
    expect(callArg.source).toContain('--xds-font-family:Arial')

    // Should not contain non-object values
    expect(callArg.source).not.toContain('should-be-ignored')
    expect(callArg.source).not.toContain('42')
    expect(callArg.source).not.toContain('stringValue')
    expect(callArg.source).not.toContain('numberValue')
  })
})
