import type { Dictionary } from '@empathyco/x-utils'
import type { ComputedRef } from 'vue'
import { useState } from '@empathyco/x-components'
import { watch } from 'vue'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value}`)
    .join(';')
}

function init() {
  const { controls: experienceControls } = useState('experienceControls') as {
    controls: ComputedRef<{ controls?: { styles?: Dictionary<string> } }>
  }

  watch(experienceControls, ({ controls }) => {
    if (controls?.styles) {
      const xdsStyles = mapCustomizationStylesToCSS(controls.styles)
      window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
    }
  })
}

export const useCustomization = () => ({ init })
