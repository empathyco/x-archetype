import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'
import { computed, watch } from 'vue'
import { xControlsState } from '../x-components/xcontrols'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value};`)
    .join('')
}

function init() {
  const { controls } = useState('experienceControls')
  const experienceControls = computed(() => controls.value ?? xControlsState)

  watch(experienceControls, ({ controls }: { controls?: { styles?: Dictionary } }) => {
    if (controls?.styles) {
      let xdsStyles = ''
      Object.entries(controls.styles)
        .filter(([, value]) => typeof value === 'object' && value !== null)
        .forEach(([block, values]: [string, Dictionary<string>]) => {
          if (block === 'colors') {
            xdsStyles += Object.entries(values)
              .map(
                ([colorName, colorValue]) =>
                  `--xds-${colorName}-50:${colorValue};--xds-${colorName}-25:color-mix(in srgb, ${colorValue} 50%, white);--xds-${colorName}-75:color-mix(in srgb, ${colorValue} 50%, black);`,
              )
              .join('')
          } else xdsStyles += mapCustomizationStylesToCSS(values)
        })
      if (xdsStyles) {
        window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
      }
    }
  })
}

export const useCustomization = () => ({ init })
