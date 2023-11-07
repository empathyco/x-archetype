import { computed, ComputedRef, inject } from 'vue';
import { Dictionary } from '@empathyco/x-utils';

/**
 * Experience controls values per x-modules.
 *
 * @param controls - The name of the xControls object that will be used.
 * @param prop - The name of the property value that will be set.
 * @param defaultValue - A default value to set if xControls one is unavailable.
 *
 * @returns The experience controls utils.
 */
export const useXControlsHelpers = ({
  controls,
  prop,
  defaultValue
}: {
  controls: string;
  prop: string;
  defaultValue?: string | number | boolean | number[];
}): ComputedRef => {
  const experienceControls = inject<Dictionary>('experienceControls', {});

  return computed(() => {
    return experienceControls.value?.controls?.[controls]?.[prop] ?? defaultValue;
  });
};
