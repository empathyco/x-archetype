import { EmpathyAdapterBuilder } from '@empathy/search-adapter';
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
  .setFeatureConfig('relatedTags', {
    endpoint: 'https://search.internal.test.empathy.co/query/empathy/relatedtags',
    responsePaths: {
      relatedTags: 'data.relatedtags'
    }
  })
  .setInstance('platform')
  .build();
