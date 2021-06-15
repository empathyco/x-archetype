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

export const adapter = new EmpathyAdapterBuilder()
  .addMapper(resultMapper, 'results')
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
  .setFeatureConfig('topRecommendations', {
    endpoint:
      'https://search.internal.test.empathy.co/query/empathy/search?' +
      'scope=desktop&lang=en&device=mobile&rows=24&start=0&origin=default&query=b',
    responsePaths: {
      results: 'catalog.content'
    }
  })
  .setFacetConfig({ modelName: 'HierarchicalFacet' }, 'categoryPaths')
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
