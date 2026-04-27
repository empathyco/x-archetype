import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value}`)
    .join(';')
}

export function useCustomization() {
  const { controls } = useState('experienceControls')

  if (controls.value.styles) {
    const xdsStyles = mapCustomizationStylesToCSS(controls.value.styles as Dictionary<string>)
    window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
  }
}
