import type { Dictionary } from '@empathyco/x-utils'
import { useState } from '@empathyco/x-components'
import { ref, watch } from 'vue'

interface Customization {
  variables?: Dictionary<string>
}

const objectToCss = (cssObject: Dictionary<string | number>) =>
  Object.entries(cssObject)
    .map(([cssVar, value]) => `${cssVar}:${value}`)
    .join(';')

const mapVariables = (variables: Dictionary<string>) => {
  return {
    '--xds-color-lead-25': variables.colorLead25,
    '--xds-color-lead-50': variables.colorLead50,
    '--xds-color-lead-75': variables.colorLead75,
    '--xds-color-neutral-10': variables.colorNeutral10,
    '--xds-color-neutral-25': variables.colorNeutral25,
    '--xds-color-neutral-50': variables.colorNeutral50,
    '--xds-color-neutral-75': variables.colorNeutral75,
    '--xds-color-neutral-90': variables.colorNeutral90,
    '--xds-font-family-main': variables.fontFamilyMain,
    '--xds-font-weight-light': variables.fontWeightLight,
    '--xds-font-weight-regular': variables.fontWeightRegular,
    '--xds-font-weight-bold': variables.fontWeightBold,
  }
}

export const useCustomization = () => {
  const { params } = useState('search')
  const jsonStyles = ref<Customization | null>(null)

  watch(
    () => params.value.instance as string,
    async instance => {
      const styles = await fetch(`./src/styles/${instance}.json`)
      jsonStyles.value = (await styles.json()) as Customization
      if (jsonStyles.value && jsonStyles.value.variables) {
        window.xCSSInjector.addStyle({
          source: `:root,:host{${objectToCss(mapVariables(jsonStyles.value.variables))}}`,
        })
      }
    },
  )
}
