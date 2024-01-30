import { computed, ComputedRef } from 'vue';
import { getSafePropertyChain } from '@empathyco/x-utils';
import { ExperienceControlsState } from '@empathyco/x-components/experience-controls';
import { useStore } from './use-store.composable';

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
  const experienceControls = (useStore('experienceControls') as ExperienceControlsState).controls;

  const getControlFromPath = <SomeType>(
    path: string,
    defaultValue?: SomeType
  ): ComputedRef<SomeType> => {
    return computed(() => {
      return getSafePropertyChain(experienceControls, path, defaultValue) as SomeType;
    });
  };

  return {
    getControlFromPath
  };
};
