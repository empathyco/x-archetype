import type { ExperienceControlsState } from '@empathyco/x-components/experience-controls'
import type { Dictionary } from '@empathyco/x-utils'
import { defaultXControlsState } from '../x-components/xcontrols'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value};`)
    .join('')
}

export function initCustomization(xControlsState?: ExperienceControlsState) {
  const { controls } = xControlsState ?? defaultXControlsState

  if (controls?.styles) {
    let xdsVariables = ''
    Object.entries(controls.styles)
      .filter(([, value]) => typeof value === 'object' && value !== null)
      .forEach(([block, values]: [string, Dictionary<string>]) => {
        if (block === 'colors') {
          xdsVariables += Object.entries(values)
            .map(
              ([colorName, colorValue]) =>
                `--xds-${colorName}-50:${colorValue};--xds-${colorName}-25:color-mix(in srgb, ${colorValue} 50%, white);--xds-${colorName}-75:color-mix(in srgb, ${colorValue} 50%, black);`,
            )
            .join('')
        } else xdsVariables += mapCustomizationStylesToCSS(values)
      })
    if (xdsVariables) {
      window.xCSSInjector.addStyle({ source: `:root,:host{${xdsVariables}}` })
    }
  }
}
