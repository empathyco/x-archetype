import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { defaultXControlsState } from '../x-components/xcontrols'

const controlsStub = ref<Record<string, any>>({})

vi.mock('@empathyco/x-components', async importOriginal => {
  const actual = await importOriginal<typeof import('@empathyco/x-components')>()
  return {
    ...actual,
    useState: vi.fn((module: string) => {
      if (module === 'experienceControls') {
        return { controls: controlsStub }
      }
      return {}
    }),
  }
})

// Import after mocking
const { useExperienceControls } = await import('./use-experience-controls.composable')

describe('useExperienceControls', () => {
  beforeEach(() => {
    controlsStub.value = {}
  })

  describe('getControl', () => {
    it('returns the control value from the store when it exists', () => {
      controlsStub.value = {
        logo: 'custom-logo.png',
        aiSearchFallback: true,
      }

      const { getControl } = useExperienceControls()

      expect(getControl<string>('logo')).toBe('custom-logo.png')
      expect(getControl<boolean>('aiSearchFallback')).toBe(true)
    })

    it('returns the default control value when not in store', () => {
      controlsStub.value = {}

      const { getControl } = useExperienceControls()

      expect(getControl<string>('logo')).toBe(defaultXControlsState.controls.logo)
      expect(getControl<boolean>('aiSearchFallback')).toBe(
        defaultXControlsState.controls.aiSearchFallback,
      )
    })

    it('supports nested keys using dot notation from store', () => {
      controlsStub.value = {
        gridConfig: {
          columnPicker: true,
          listMode: false,
          columnSelector: [2, 4],
        },
      }

      const { getControl } = useExperienceControls()

      expect(getControl<boolean>('gridConfig.columnPicker')).toBe(true)
      expect(getControl<boolean>('gridConfig.listMode')).toBe(false)
      expect(getControl<number[]>('gridConfig.columnSelector')).toEqual([2, 4])
    })

    it('supports nested keys using dot notation from defaults', () => {
      controlsStub.value = {}

      const { getControl } = useExperienceControls()

      expect(getControl<boolean>('gridConfig.columnPicker')).toBe(
        defaultXControlsState.controls.gridConfig.columnPicker,
      )
      expect(getControl<boolean>('gridConfig.listMode')).toBe(
        defaultXControlsState.controls.gridConfig.listMode,
      )
      expect(getControl<number[]>('gridConfig.columnSelector')).toEqual(
        defaultXControlsState.controls.gridConfig.columnSelector,
      )
    })

    it('supports deeply nested keys', () => {
      controlsStub.value = {
        styles: {
          colors: {
            primary: '#000000',
            secondary: '#FFFFFF',
          },
        },
      }

      const { getControl } = useExperienceControls()

      expect(getControl<string>('styles.colors.primary')).toBe('#000000')
      expect(getControl<string>('styles.colors.secondary')).toBe('#FFFFFF')
    })

    it('returns undefined for non-existent nested keys', () => {
      controlsStub.value = {}

      const { getControl } = useExperienceControls()

      expect(getControl<string>('nonexistent.nested.key')).toBeUndefined()
    })

    it('handles partial override - uses store value for existing, falls back to default for missing nested keys', () => {
      controlsStub.value = {
        gridConfig: {
          columnPicker: false,
        },
      }

      const { getControl } = useExperienceControls()

      // Should return store value when accessing the overridden property
      expect(getControl<boolean>('gridConfig.columnPicker')).toBe(false)

      // Should return default value for missing nested property
      // (because 'gridConfig.listMode' exists in defaultXControlsState)
      expect(getControl<boolean>('gridConfig.listMode')).toBe(
        defaultXControlsState.controls.gridConfig.listMode,
      )
    })
  })
})
