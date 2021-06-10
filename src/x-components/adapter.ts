import {
  DEPENDENCIES,
  EmpathyAdapterBuilder,
  EmpathyFacetMapper,
  EmpathyNumberRangeFacetMapper,
  EmpathySimpleFacetMapper
} from '@empathy/search-adapter';
import { HierarchicalFacetMapper } from '../adapters/demo-hierarchical-mapper';
import { customRequestMapper } from '../adapters/demo-request-mapper';
import { resultMapper } from '../adapters/demo-result.mapper';

export const adapter = new EmpathyAdapterBuilder()
  .addRequestMapper(customRequestMapper)
  .addMapper(resultMapper, 'results')
  .setFeatureConfig('search', {
    endpoint: 'https://search.internal.test.empathy.co/query/empathy/search',
    responsePaths: {
      results: 'catalog.content',
      facets: 'catalog.facets',
      totalResults: 'catalog.numFound'
    }
  })
  .setFacetConfig({ modelName: 'HierarchicalFacet' }, 'categoryPaths')
  .configureContainer(container => {
    container.unbind(DEPENDENCIES.ResponseMappers.facets);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(EmpathyFacetMapper);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(HierarchicalFacetMapper);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(EmpathyNumberRangeFacetMapper);
    container.bind(DEPENDENCIES.ResponseMappers.facets).to(EmpathySimpleFacetMapper);
  })
  .setInstance('platform')
  .build();
