import { computed, ComputedRef, inject } from 'vue';
import { Dictionary } from '@empathyco/x-utils';

/**
 * Given a controls' object property chain, gets the experience controls values from the response.
 *
 * @param path - The chain of properties in an xControls object.
 * @param defaultValue - A default value to set if xControls one is unavailable.
 *
 * @returns The experience controls property value.
 */
export const useXControlsHelpers = ({
  path,
  defaultValue
}: {
  path: string;
  defaultValue?: string | number | boolean | number[];
}): ComputedRef => {
  const experienceControls = inject<Dictionary>('experienceControls', {});

  const getByPath = function <T>(this: T, key: string): any {
    return key.split('.').reduce((obj, prop) => (obj as any)[prop], this);
  };
  return computed(() => {
    return getByPath.call(experienceControls.value?.controls, path) ?? defaultValue;
  });
};
