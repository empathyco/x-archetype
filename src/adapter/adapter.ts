import {
  DEPENDENCIES,
  EmpathyAdapterBuilder,
  EmpathyFacetMapper,
  EmpathyNumberRangeFacetMapper,
  EmpathyRequestParamsMapper,
  EmpathySimpleFacetMapper
} from '@empathy/search-adapter';
import { HierarchicalFacetMapper } from './demo-hierarchical-mapper';
import { SearchRequestMapper } from './demo-request-mapper';
import { resultMapper } from './demo-result.mapper';
import { priceFilterMapper } from './demo-price-filter-mapper';

export const adapter = new EmpathyAdapterBuilder()
  .addMapper(resultMapper, 'results')
  .addMapper(priceFilterMapper, 'numberRangeFilter')
  .replaceClassRequestMapper(SearchRequestMapper)
  .setFeatureConfig('search', {
    endpoint: 'https://search.internal.test.empathy.co/query/empathy/search',
    responsePaths: {
      results: 'catalog.content',
      facets: 'catalog.facets',
      totalResults: 'catalog.numFound'
    }
  })
  .setFeatureConfig('relatedTags', {
    endpoint: 'https://search.internal.test.empathy.co/query/empathy/relatedtags',
    responsePaths: {
      relatedTags: 'data.relatedtags'
    }
  })
  .setFeatureConfig('nextQueries', {
    endpoint: 'https://search.internal.test.empathy.co/query/empathy/nextqueries',
    responsePaths: {
      nextQueries: 'data.nextQueries'
    }
  })
  .setFeatureConfig('suggestions', {
    endpoint: 'https://search.internal.test.empathy.co/query/empathy/empathize',
    responsePaths: {
      topTrends: 'data.topTrends'
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
    container.bind(DEPENDENCIES.requestMappers).to(EmpathyRequestParamsMapper);
  })
  .setInstance('platform')
  .build();
