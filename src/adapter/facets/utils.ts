import type { MapperContext } from '@empathyco/x-adapter'
import type { FacetConfig, PlatformFacetType } from '@empathyco/x-adapter-platform'
import { getFacetConfig } from '@empathyco/x-adapter-platform'

/**
 * Retrieves the facet configuration with editable properties for a given facet ID and type.
 *
 * @param facetId - The ID of the facet to retrieve the configuration for.
 * @param type - The type of the platform facet.
 * @returns The facet configuration with editable properties.
 */
export const getFacetConfigWithEditable = (
  facetId: string,
  type: PlatformFacetType,
): FacetConfig => {
  if (facetId === 'price') {
    const salePriceConfig = getFacetConfig('editable-range')
    const getSalePriceFilterId = (context?: MapperContext): string | undefined =>
      (context?.requestParameters?.filter as string[])?.find(filter => filter.includes('price'))

    salePriceConfig.schema = {
      ...salePriceConfig.schema,
      id: ({ filter }, $context): string => {
        const currentSalePriceFilterId = getSalePriceFilterId($context)
        return currentSalePriceFilterId ?? (filter as string)
      },
      label: (_, $context): string | undefined => getSalePriceFilterId($context)?.split(':')[1],
      range: ({ value }, $context): { min: number | null; max: number | null } => {
        const currentSalePriceFilterId = getSalePriceFilterId($context)
        const stringRange = currentSalePriceFilterId?.split(':')[1] ?? (value as string)

        const min = Number(stringRange.split('-')[0])
        const max = Number(stringRange.split('-')[1])

        return {
          min: Number.isNaN(min) ? null : min,
          max: Number.isNaN(max) ? null : max,
        }
      },
    }

    return salePriceConfig
  }

  return getFacetConfig(type)
}
