import type { ExperienceControlsState } from '@empathyco/x-components/experience-controls'
import { describe, expect, it } from 'vitest'
import { defaultXControlsState } from '../x-components/xcontrols'

// Import after mocking
const { useExperienceControls } = await import('./use-experience-controls.composable')

describe('useExperienceControls', () => {
  describe('getControl', () => {
    it('returns the control value from the store when it exists', () => {
      useExperienceControls().controls.value = {
        logo: 'custom-logo.png',
        aiSearchFallback: true,
      } as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      expect(getControl<string>('logo').value).toBe('custom-logo.png')
      expect(getControl<boolean>('aiSearchFallback').value).toBe(true)
    })

    it('returns the default control value when not in store', () => {
      useExperienceControls().controls.value = {} as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      expect(getControl<string>('logo').value).toBe(defaultXControlsState.controls.logo)
      expect(getControl<boolean>('aiSearchFallback').value).toBe(
        defaultXControlsState.controls.aiSearchFallback,
      )
    })

    it('supports nested keys using dot notation from store', () => {
      useExperienceControls().controls.value = {
        gridConfig: {
          columnPicker: true,
          listMode: false,
          columnSelector: [2, 4],
        },
      } as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      expect(getControl<boolean>('gridConfig.columnPicker').value).toBe(true)
      expect(getControl<boolean>('gridConfig.listMode').value).toBe(false)
      expect(getControl<number[]>('gridConfig.columnSelector').value).toEqual([2, 4])
    })

    it('supports nested keys using dot notation from defaults', () => {
      useExperienceControls().controls.value = {} as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      expect(getControl<boolean>('gridConfig.columnPicker').value).toBe(
        defaultXControlsState.controls.gridConfig.columnPicker,
      )
      expect(getControl<boolean>('gridConfig.listMode').value).toBe(
        defaultXControlsState.controls.gridConfig.listMode,
      )
      expect(getControl<number[]>('gridConfig.columnSelector').value).toEqual(
        defaultXControlsState.controls.gridConfig.columnSelector,
      )
    })

    it('supports deeply nested keys', () => {
      useExperienceControls().controls.value = {
        styles: {
          colors: {
            primary: '#000000',
            secondary: '#FFFFFF',
          },
        },
      } as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      expect(getControl<string>('styles.colors.primary').value).toBe('#000000')
      expect(getControl<string>('styles.colors.secondary').value).toBe('#FFFFFF')
    })

    it('returns undefined for non-existent nested keys', () => {
      useExperienceControls().controls.value = {} as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      expect(getControl<string>('nonexistent.nested.key').value).toBeUndefined()
    })

    it('handles partial override - uses store value for existing, falls back to default for missing nested keys', () => {
      useExperienceControls().controls.value = {
        gridConfig: {
          columnPicker: false,
        },
      } as unknown as ExperienceControlsState

      const { getControl } = useExperienceControls()

      // Should return store value when accessing the overridden property
      expect(getControl<boolean>('gridConfig.columnPicker').value).toBe(false)

      // Should return default value for missing nested property
      // (because 'gridConfig.listMode' exists in defaultXControlsState)
      expect(getControl<boolean>('gridConfig.listMode').value).toBe(
        defaultXControlsState.controls.gridConfig.listMode,
      )
    })
  })
})
