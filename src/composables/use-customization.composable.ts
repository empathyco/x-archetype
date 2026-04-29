import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'
import { watch } from 'vue'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value}`)
    .join(';')
}

export function useCustomization() {
  const init = () => {
    const { controls } = useState('experienceControls')

    watch(controls, controlsData => {
      const controlsCss = controlsData.controls as Dictionary<unknown>
      if (controlsCss.styles) {
        const xdsStyles = mapCustomizationStylesToCSS(controlsCss.styles as Dictionary<string>)
        window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
      }
    })
  }

  return { init }
}
