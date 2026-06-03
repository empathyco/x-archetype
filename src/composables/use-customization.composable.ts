import type { Dictionary } from '@empathyco/x-utils'
import type { XControlsState } from '../x-components/xcontrols'
import { useState } from '@empathyco/x-components'
import { computed, watch } from 'vue'
import { xControlsState } from '../x-components/xcontrols'

function mapCustomizationColorsToCSS(colors: XControlsState['controls']['colors']): string {
  const colorVars: string[] = []

  Object.entries(colors).forEach(([colorName, colorValue]) => {
    colorVars.push(`--xds-color-${colorName}-50:${colorValue}`)
    colorVars.push(`--xds-color-${colorName}-25:color-mix(in srgb, ${colorValue} 50%, white)`)
    colorVars.push(`--xds-color-${colorName}-75:color-mix(in srgb, ${colorValue} 50%, black)`)
  })

  return colorVars.join(';')
}

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value}`)
    .join(';')
}

function init() {
  const { controls } = useState('experienceControls')
  const experienceControls = computed(
    () => (controls.value as unknown as XControlsState) ?? xControlsState,
  )

  watch(experienceControls, ({ controls }: XControlsState) => {
    if (controls?.styles) {
      const xdsStyles = mapCustomizationStylesToCSS(controls.styles)
      window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
    }
    if (controls?.colors) {
      const xdsColorStyles = mapCustomizationColorsToCSS(controls.colors)
      window.xCSSInjector.addStyle({ source: `:root,:host{${xdsColorStyles}}` })
    }
  })
}

export const useCustomization = () => ({ init })
