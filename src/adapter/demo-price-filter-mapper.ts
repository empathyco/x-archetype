import { EmpathyFilter } from '@empathyco/x-adapter';
import { NumberRangeFilter } from '@empathyco/x-types';

/**
 * Price filter mapper.
 *
 * @param rawFilter - Raw filter from backend.
 * @param filter - Current price filter.
 *
 * @returns Modified price filter.
 *
 * @internal
 */
export function priceFilterMapper(
  rawFilter: EmpathyFilter,
  filter: NumberRangeFilter
): NumberRangeFilter {
  const [min, max]: number[] = rawFilter.value.split('-').map(Number);
  return Object.assign<NumberRangeFilter, Partial<NumberRangeFilter>>(filter, {
    range: {
      min,
      max
    }
  });
}
