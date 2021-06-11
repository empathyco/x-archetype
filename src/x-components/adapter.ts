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
  .setInstance('platform')
  .build();
