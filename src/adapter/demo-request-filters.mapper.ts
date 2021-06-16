import { RequestMapper } from '@empathy/search-adapter';
import { BooleanFilter, Filter, isHierarchicalFilter } from '@empathy/search-types';
import { injectable } from 'inversify';

@injectable()
export class RequestFiltersMapper implements RequestMapper<Filter[], string[]> {
  map(filters: Filter[], filtersValue: string[]): string[] {
    if (filters.length > 1) {
      return filters
        .filter(filter => {
          return (
            !isHierarchicalFilter(filter) ||
            !filters.some(f => isHierarchicalFilter(f) && f.parentId === filter.id)
          );
        })
        .map(filter => (filter as BooleanFilter).value);
    } else {
      return filtersValue;
    }
  }
}