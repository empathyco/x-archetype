import { use$x } from '@empathyco/x-components';
import { computed, ComputedRef } from 'vue';

type PredictiveHelpers = {
  navigationHijacker: { xEvent: string; moduleName: string; direction: string }[];
  showIdentifierResults: ComputedRef<boolean>;
  showHistoryQueries: ComputedRef<boolean>;
  showQuerySuggestions: ComputedRef<boolean>;
  showNextQueries: ComputedRef<boolean>;
  showPopularSearches: ComputedRef<boolean>;
  showEmpathize: ComputedRef<boolean>;
};

/**
 * Shared code between the predictive layers.
 *
 * @returns The predictive utils.
 */
export const usePredictiveHelpers = (): PredictiveHelpers => {
  const navigationHijacker = [
    { xEvent: 'UserPressedArrowKey', moduleName: 'scroll', direction: 'ArrowDown' },
    { xEvent: 'UserPressedArrowKey', moduleName: 'searchBox', direction: 'ArrowDown' }
  ];

  const $x = use$x();

  const showIdentifierResults = computed(() => {
    return $x.identifierResults.length > 0;
  });

  const showHistoryQueries = computed(() => {
    return $x.historyQueriesWithResults.length > 0;
  });

  const showQuerySuggestions = computed(() => {
    return (
      !!$x.query.searchBox && $x.identifierResults.length === 0 && $x.querySuggestions.length > 0
    );
  });

  const showNextQueries = computed(() => {
    return $x.nextQueries.length > 0 && $x.identifierResults.length === 0;
  });

  const showPopularSearches = computed(() => {
    return $x.popularSearches.length > 0 && !$x.query.searchBox;
  });

  const showEmpathize = computed(() => {
    return (
      showHistoryQueries.value ||
      showQuerySuggestions.value ||
      showNextQueries.value ||
      showPopularSearches.value
    );
  });

  return {
    navigationHijacker,
    showIdentifierResults,
    showHistoryQueries,
    showQuerySuggestions,
    showNextQueries,
    showPopularSearches,
    showEmpathize
  };
};
