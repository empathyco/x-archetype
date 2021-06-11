import {
  DEPENDENCIES,
  Dictionary,
  MapRequest,
  pipeMappers,
  QueryableRequest,
  RequestMapper,
  RequestMapperContext,
  SearchRequest
} from '@empathy/search-adapter';
import { Filter } from '@empathy/search-types';
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
  sortDirection?: 'asc' | 'desc';
  start?: number;
  store?: string;
  warehouse?: string;
}

/**
 * @public
 */
@injectable()
export class EmpathySearchRequestMapper
  implements RequestMapper<SearchRequest, PlatformSearchRequest>
{
  private readonly mapQuery: MapRequest<QueryableRequest, string>;
  private readonly mapFilters: MapRequest<Dictionary<Filter[]>, string[]>;

  public constructor(
    @multiInject(DEPENDENCIES.RequestMappers.Parameters.query)
    queryMapper: RequestMapper<QueryableRequest, string>[],
    @multiInject(DEPENDENCIES.RequestMappers.Parameters.filters)
    filtersMapper: RequestMapper<Dictionary<Filter[]>, string[]>[]
  ) {
    this.mapQuery = pipeMappers(...queryMapper);
    this.mapFilters = pipeMappers(...filtersMapper);
  }

  map(
    { query, relatedTags = [], filters = {}, ...rest }: SearchRequest,
    request: PlatformSearchRequest,
    context: RequestMapperContext
  ): PlatformSearchRequest {
    return Object.assign<PlatformSearchRequest, Partial<PlatformSearchRequest>>(request, {
      ...rest,
      query: query && this.mapQuery({ query, relatedTags }, query, context),
      filter: this.mapFilters(filters, [], context)
    });
  }
}
