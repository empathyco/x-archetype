import {
  DEPENDENCIES,
  Dictionary,
  MapRequest,
  pipeMappers,
  QueryableRequest,
  RequestMapper,
  RequestMapperContext,
  SearchRequest
} from '@empathyco/x-adapter';
import { Filter, Sort } from '@empathyco/x-types';
import { injectable, multiInject } from 'inversify';

export interface PlatformSearchRequest {
  catalogue?: string;
  filter: string[];
  lang: string;
  origin?: string;
  query: string;
  rows?: number;
  scope?: string;
  sort?: string;
  sortDirection?: string;
  start?: number;
  store?: string;
  warehouse?: string;
}

/**
 * @public
 */
@injectable()
export class SearchRequestMapper implements RequestMapper<SearchRequest, PlatformSearchRequest> {
  private readonly mapFilters: MapRequest<Dictionary<Filter[]>, string[]>;
  private readonly mapQuery: MapRequest<QueryableRequest, string>;
  private readonly mapSort: MapRequest<Sort | undefined, string | undefined>;

  public constructor(
    @multiInject(DEPENDENCIES.RequestMappers.Parameters.query)
    queryMapper: RequestMapper<QueryableRequest, string>[],
    @multiInject(DEPENDENCIES.RequestMappers.Parameters.filters)
    filtersMapper: RequestMapper<Dictionary<Filter[]>, string[]>[],
    @multiInject(DEPENDENCIES.RequestMappers.Parameters.sort)
    sortMappers: RequestMapper<Sort | undefined, string | undefined>[]
  ) {
    this.mapQuery = pipeMappers(...queryMapper);
    this.mapFilters = pipeMappers(...filtersMapper);
    this.mapSort = pipeMappers(...sortMappers);
  }

  map(
    { query, relatedTags = [], filters = {}, sort, ...rest }: SearchRequest,
    request: PlatformSearchRequest,
    context: RequestMapperContext
  ): PlatformSearchRequest {
    return Object.assign<PlatformSearchRequest, Partial<PlatformSearchRequest>>(request, {
      ...rest,
      query: query && this.mapQuery({ query, relatedTags }, query, context),
      filter: this.mapFilters(filters, [], context),
      sort: this.mapSort(sort, '', context)
    });
  }
}
