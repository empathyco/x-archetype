/**
 * Hierarchical Empathy facet mapper.
 *
 * @public
 */
import {
  DEPENDENCIES,
  EmpathyFacet,
  EmpathyFilter,
  MapFn,
  pipeMappers,
  ResponseMapper,
  ResponseMapperContext
} from '@empathyco/x-adapter';
import { HierarchicalFacet, HierarchicalFilter } from '@empathyco/x-types';
import { injectable, multiInject } from 'inversify';

export interface PlatformFilter {
  count: number;
  filter: string;
  selected?: boolean;
  value: string;
  children?: {
    facet: string;
    values: PlatformFilter[];
  };
}

@injectable()
export class HierarchicalFacetMapper implements ResponseMapper<EmpathyFacet, HierarchicalFacet> {
  protected readonly mapFilter: MapFn<EmpathyFilter, HierarchicalFilter>;

  public constructor(
    @multiInject(DEPENDENCIES.ResponseMappers.hierarchicalFilter)
    filterMappers: ResponseMapper<EmpathyFilter, HierarchicalFilter>[]
  ) {
    this.mapFilter = pipeMappers(...filterMappers);
  }

  map(
    rawFacet: EmpathyFacet,
    facet: HierarchicalFacet,
    context: ResponseMapperContext
  ): HierarchicalFacet {
    if (facet.modelName === 'HierarchicalFacet') {
      Object.assign<HierarchicalFacet, Partial<HierarchicalFacet>>(facet, {
        filters: this.mapFiltersTree(facet, rawFacet.values, context)
      });
    }
    return facet;
  }

  protected mapFiltersTree(
    facet: HierarchicalFacet,
    rawFilters: PlatformFilter[],
    context: ResponseMapperContext
  ): HierarchicalFilter[] {
    const filters: HierarchicalFilter[] = [];
    const initFilterProps: Readonly<Partial<HierarchicalFilter>> = {
      facetId: facet.id,
      parentId: null
    };
    rawFilters.forEach(rawFilter => {
      this.mapDeepFilter(rawFilter, initFilterProps, context, filters);
    });
    return filters;
  }

  protected mapDeepFilter(
    rawFilter: PlatformFilter,
    initFilterProps: Readonly<Partial<HierarchicalFilter>>,
    context: ResponseMapperContext,
    filters: HierarchicalFilter[]
  ): HierarchicalFilter['id'] {
    const filter = this.mapFilter(rawFilter, { ...initFilterProps } as HierarchicalFilter, context);
    filter.children = rawFilter.children?.values.map(rawFilterChild =>
      this.mapDeepFilter(
        rawFilterChild,
        { ...initFilterProps, parentId: filter.id },
        context,
        filters
      )
    );
    filters.push(filter);
    return filter.id;
  }
}
