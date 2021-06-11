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
} from '@empathy/search-adapter';
import { HierarchicalFacet, HierarchicalFilter } from '@empathy/search-types';
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
    const initFilterProps: Partial<HierarchicalFilter> = { facetId: facet.id, parentId: null };
    return this.mapDeepFilters(rawFilters, initFilterProps, context);
  }

  protected mapDeepFilters(
    rawFilters: PlatformFilter[] = [],
    initFilterProps: Readonly<Partial<HierarchicalFilter>>,
    context: ResponseMapperContext
  ): HierarchicalFilter[] {
    return rawFilters.map(rawFilter => {
      const filter = this.mapFilter(
        rawFilter,
        { ...initFilterProps } as HierarchicalFilter,
        context
      );
      filter.children = this.mapDeepFilters(
        rawFilter.children?.values,
        { ...initFilterProps, parentId: filter.id },
        context
      );
      return filter;
    });
  }
}
