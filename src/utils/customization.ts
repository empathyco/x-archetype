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
    let xdsStyles = ''
    Object.entries(controls.styles)
      .filter(([, value]) => typeof value === 'object' && value !== null)
      .forEach(([, values]: [string, Dictionary<string>]) => {
        xdsStyles += mapCustomizationStylesToCSS(values)
      })
    if (xdsStyles) {
      window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
    }
  }
}
