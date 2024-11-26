import type { ComputedRef } from 'vue';
import { useState } from '@empathyco/x-components';
import { getSafePropertyChain } from '@empathyco/x-utils';
import { computed } from 'vue';

/**
 * Given a controls' object property chain, gets the experience controls values from the response.
 * A defaultValue can be set as a safeguard in case the controls response was empty.
 *
 * @returns An object containing the function to search for a configuration
 * and set the experience controls property value.
 */
export const useExperienceControls = (): {
  getControlFromPath: <SomeType>(path: string, defaultValue?: SomeType) => ComputedRef<SomeType>;
} => {
  const experienceControls = useState('experienceControls', ['controls']).controls;

  const getControlFromPath = <SomeType>(
    path: string,
    defaultValue?: SomeType
  ): ComputedRef<SomeType> => {
    return computed(() => {
      return getSafePropertyChain(experienceControls.value, path, defaultValue) as SomeType;
    });
  };

  return {
    getControlFromPath
  };
};
