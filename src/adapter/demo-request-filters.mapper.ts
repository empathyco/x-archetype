import { RequestMapper } from '@empathy/search-adapter';
import { BooleanFilter, Filter, isHierarchicalFilter } from '@empathy/search-types';
import { injectable } from 'inversify';

@injectable()
export class RequestFiltersMapper implements RequestMapper<Filter[], string[]> {
  map(filters: Filter[], filtersValue: string[]): string[] {
    if (filters.length > 1) {
      return filters
        .filter(filter => {
          return (isHierarchicalFilter(filter) && filter.parentId) || !isHierarchicalFilter(filter);
        })
        .map(filter => (filter as BooleanFilter).value);
    } else {
      return filtersValue;
    }
  }
}
