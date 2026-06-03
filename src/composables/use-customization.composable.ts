import type { Dictionary } from '@empathyco/x-utils'
// import { useState } from '@empathyco/x-components'
import { computed, watch } from 'vue'
import { xControlsState } from '../x-components/xcontrols'

function mapCustomizationStylesToCSS(customizationStyles: Dictionary<string>) {
  return Object.entries(customizationStyles)
    .map(([key, value]) => `--xds-${key}:${value}`)
    .join(';')
}

function init() {
  // const { controls } = useState('experienceControls')
  const experienceControls = computed(() => xControlsState)

  watch(
    experienceControls,
    ({ controls }: { controls?: { styles?: Dictionary<string> } }) => {
      if (controls?.styles) {
        const xdsStyles = mapCustomizationStylesToCSS(controls.styles)
        window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
      }
    },
    { immediate: true },
  )
}

export const useCustomization = () => ({ init })
