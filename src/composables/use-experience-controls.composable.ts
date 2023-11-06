import { computed, ComputedRef, inject } from 'vue';
import { Dictionary } from '@empathyco/x-utils';

type ExperienceControlsHelpers = {
  maxItems: ComputedRef<number>;
  columns: ComputedRef<Array<number>>;
};

/**
 * Experience controls values per x-modules.
 *
 * @param controls - The name of the xControls controls object that will be used.
 * @param prop - The name of the property that will be configured.
 * @param defaultValue - A default value to set if xControls value is unavailable.
 *
 * @returns The experience controls utils.
 */
export const useExperienceControlsHelpers = ({
  controls,
  prop,
  defaultValue
}: {
  controls: string;
  prop: string;
  defaultValue?: string | number | boolean | number[];
}): ExperienceControlsHelpers => {
  const experienceControls = inject<Dictionary>('experienceControls', {});

  const maxItems = computed(() => {
    return experienceControls.value?.controls?.[controls]?.[prop] ?? (defaultValue as number);
  });

  const columns = computed(() => {
    return experienceControls.value?.controls?.[controls]?.[prop] ?? (defaultValue as number[]);
  });

  return {
    maxItems,
    columns
  };
};
