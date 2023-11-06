import { computed, ComputedRef, inject } from 'vue';
import { Dictionary } from '@empathyco/x-utils';

type ExperienceControlsHelpers = {
  maxItems: ComputedRef<number>;
};

/**
 * Experience controls values per x-modules.
 *
 * @param xmodule - The name of the x-module whose config will be set with xControls.
 * @param prop - The name of the property that will be configured.
 * @param defaultValue - A default value to set if xControls value is unavailable.
 *
 * @returns The experience controls utils.
 */
export const useExperienceControlsHelpers = ({
  xmodule,
  prop,
  defaultValue
}: {
  xmodule: string;
  prop: string;
  defaultValue?: string | number | boolean;
}): ExperienceControlsHelpers => {
  const experienceControls = inject<Dictionary>('experienceControls', {});

  const maxItems = computed(() => {
    return experienceControls.value?.controls?.[xmodule]?.[prop] ?? (defaultValue as number);
  });

  return {
    maxItems
  };
};
