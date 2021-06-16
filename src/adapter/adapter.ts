import {
  DEPENDENCIES,
  EmpathyAdapterBuilder,
  EmpathyFacetMapper,
  EmpathyNumberRangeFacetMapper,
  EmpathyRequestParamsMapper,
  EmpathySimpleFacetMapper
} from '@empathy/search-adapter';
import { HierarchicalFacetMapper } from './demo-hierarchical-mapper';
import { RequestFiltersMapper } from './demo-request-filters.mapper';
import { SearchRequestMapper } from './demo-request-mapper';
import { resultMapper } from './demo-result.mapper';
import { priceFilterMapper } from './demo-price-filter-mapper';
import { EmpathyEndpointsService } from './empathy-endpoints.service';

export const adapter = new EmpathyAdapterBuilder()
  .setEnvironment((window as any).initX.env)
  .addMapper(resultMapper, 'results')
  .addMapper(priceFilterMapper, 'numberRangeFilter')
  .replaceClassRequestMapper(SearchRequestMapper)
  .setFeatureConfig('search', {
    endpoint: 'https://search.internal.{env}.empathy.co/query/empathy/search',
    responsePaths: {
      results: 'catalog.content',
      facets: 'catalog.facets',
      totalResults: 'catalog.numFound',
      spellcheck: 'catalog.spellchecked'
    }
  })
  .setFeatureConfig('relatedTags', {
    endpoint: 'https://search.internal.{env}.empathy.co/query/empathy/relatedtags',
    responsePaths: {
      relatedTags: 'data.relatedtags'
    }
  })
  .setFeatureConfig('nextQueries', {
    endpoint: 'https://search.internal.{env}.empathy.co/query/empathy/nextqueries',
    responsePaths: {
      nextQueries: 'data.nextQueries'
    }
  })
  .setFeatureConfig('suggestions', {
    endpoint: 'https://search.internal.{env}.empathy.co/query/empathy/empathize',
    responsePaths: {
      topTrends: 'data.topTrends'
    }
  })
  .setFeatureConfig('topRecommendations', {
    endpoint:
      'https://search.internal.{env}.empathy.co/query/empathy/search?' +
      'scope=desktop&lang=en&device=mobile&rows=24&start=0&origin=default&query=c',
    responsePaths: {
      results: 'catalog.content'
    }
  })
  .setFacetConfig({ modelName: 'HierarchicalFacet' }, 'categoryPaths')
  .setFacetConfig({ modelName: 'NumberRangeFacet' }, 'price')
  .configureContainer(container => {
    container.unbind(DEPENDENCIES.ResponseMappers.facets);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(EmpathyFacetMapper);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(HierarchicalFacetMapper);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(EmpathyNumberRangeFacetMapper);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(EmpathySimpleFacetMapper);
    container.bind(DEPENDENCIES.RequestMappers.Parameters.filtersValue).to(RequestFiltersMapper);
    container.bind(DEPENDENCIES.requestMappers).to(EmpathyRequestParamsMapper);
    container.rebind(DEPENDENCIES.endpointsService).to(EmpathyEndpointsService);
  })
  .setInstance('platform')
  .build();
