import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'
import { computed, watch } from 'vue'
import { xControlsState } from '../x-components/xcontrols'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value}`)
    .join(';')
}

function init() {
  const { controls } = useState('experienceControls')
  const experienceControls = computed(() => controls.value ?? xControlsState)

  watch(experienceControls, ({ controls }: { controls?: { styles?: Dictionary } }) => {
    if (controls?.styles) {
      Object.entries(controls.styles).forEach(value => {
        value.forEach(customization => {
          // eslint-disable-next-line ts/no-unsafe-argument
          const xdsStyles = mapCustomizationStylesToCSS(customization)
          window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
        })
      })
    }
  })
}

export const useCustomization = () => ({ init })
