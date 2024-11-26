import type { Ref} from 'vue';
import { isStringEmpty, useXBus } from '@empathyco/x-components';
import { ref } from 'vue';

export const useHasSearched = (): { hasSearched: Ref<boolean> } => {
  const bus = useXBus();
  const hasSearched = ref(false);
  const searchEvents = [
    'UserAcceptedAQuery',
    'ParamsLoadedFromUrl',
    'UserAcceptedAQueryPreview'
  ] as const;

  searchEvents.forEach(event => {
    bus.on(event, true).subscribe(({ eventPayload }) => {
      if (typeof eventPayload === 'string' || !isStringEmpty(eventPayload.query)) {
        hasSearched.value = true;
      }
    });
  });

  return { hasSearched };
};
