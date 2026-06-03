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

  watch(
    experienceControls,
    ({
      controls,
    }: {
      controls?: {
        button?: Dictionary<string>
        tag?: Dictionary<string>
        styles?: Dictionary<string>
      }
    }) => {
      const customizationStyles = [
        controls?.styles,
        controls?.button,
        controls?.tag,
      ] as Dictionary<string>[]

      customizationStyles.forEach(customization => {
        const xdsStyles = mapCustomizationStylesToCSS(customization)
        window.xCSSInjector.addStyle({ source: `:root,:host{${xdsStyles}}` })
      })
    },
  )
}

export const useCustomization = () => ({ init })
