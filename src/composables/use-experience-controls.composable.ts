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
export const useXControls = ({
  path,
  defaultValue
}: {
  path: never;
  defaultValue?: string | number | boolean | number[];
}): ComputedRef => {
  const experienceControls = (useStore('experienceControls') as unknown as ExperienceControlsState)
    .controls.controls;

  return computed(() => {
    return getSafePropertyChain(experienceControls, path, defaultValue);
  });
};
