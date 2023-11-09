import { computed, ComputedRef } from 'vue';
import { getSafePropertyChain } from '@empathyco/x-utils';
import { ExperienceControlsState } from '@empathyco/x-components/experience-controls';
import { useStore } from './use-store.composable';

/**
 * Given a controls' object property chain, gets the experience controls values from the response.
 *
 * @param path - The chain of properties in an xControls object.
 * @param defaultValue - A default value to set if xControls one is unavailable.
 *
 * @returns The experience controls property value.
 */
// Rename
export const useExperienceControls = (): {
  getControlFromPath: <SomeType>(path: string, defaultValue?: SomeType) => ComputedRef<SomeType>;
} => {
  const experienceControls = (useStore('experienceControls') as ExperienceControlsState).controls
    .controls;

// extracted the current logic to a function. The function can be typed so the return type is known and also it infers the return type from the default value
  const getControlFromPath = <SomeType>(
    path: string,
    defaultValue?: SomeType
  ): ComputedRef<SomeType> => {
    return computed(() => {
      return getSafePropertyChain(
        experienceControls,
        path as ExtractPath<typeof experienceControls>,
        defaultValue
      ) as SomeType;
    });
  };

  return {
    getControlFromPath
  };
};
