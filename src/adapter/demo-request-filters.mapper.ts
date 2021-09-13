import { RequestMapper } from '@empathyco/x-adapter';
import { Filter, isHierarchicalFilter } from '@empathyco/x-types';
import { injectable } from 'inversify';

@injectable()
export class RequestFiltersMapper implements RequestMapper<Filter[], Array<Filter['id']>> {
  map(filters: Filter[], filtersValue: string[]): Array<Filter['id']> {
    if (filters.length > 1) {
      return filters
        .filter(filter => {
          return (
            !isHierarchicalFilter(filter) ||
            !filters.some(f => isHierarchicalFilter(f) && f.parentId === filter.id)
          );
        })
        .map(filter => filter.id);
    } else {
      return filtersValue;
    }
  }
}
