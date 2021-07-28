import {
  DEPENDENCIES,
  EmpathyAdapterBuilder,
  EmpathyFacetMapper,
  EmpathyNumberRangeFacetMapper,
  EmpathyRequestParamsMapper,
  EmpathySimpleFacetMapper
} from '@empathyco/x-adapter';
import { SnippetConfig } from '@empathyco/x-components';
import { bannerMapper } from './demo-banner-mapper';
import { HierarchicalFacetMapper } from './demo-hierarchical-mapper';
import { promotedMapper } from './demo-promoted-mapper';
import { RequestFiltersMapper } from './demo-request-filters.mapper';
import { SearchRequestMapper } from './demo-request-mapper';
import { resultMapper } from './demo-result.mapper';
import { priceFilterMapper } from './demo-price-filter-mapper';
import { EmpathyEndpointsService } from './empathy-endpoints.service';

declare global {
  interface Window {
    initX: SnippetConfig;
  }
}

export const adapter = new EmpathyAdapterBuilder()
  .setEnvironment(window.initX.env ?? 'test')
  .addMapper(resultMapper, 'results')
  .addMapper(bannerMapper, 'banners')
  .addMapper(promotedMapper, 'promoteds')
  .addMapper(priceFilterMapper, 'numberRangeFilter')
  .replaceClassRequestMapper(SearchRequestMapper)
  .setFeatureConfig('search', {
    endpoint: 'https://search.internal.{env}.empathy.co/query/empathy/search',
    responsePaths: {
      results: 'catalog.content',
      facets: 'catalog.facets',
      totalResults: 'catalog.numFound',
      spellcheck: 'catalog.spellchecked',
      banners: 'banner.content',
      promoteds: 'promoted.content'
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
    endpoint: 'https://search.internal.{env}.empathy.co/query/empathy/topclicked',
    responsePaths: {
      results: 'topclicked.content'
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
  .onBeforeRequest(({ request }) => {
    delete request.scope;
  }, 'topRecommendations')
  .onBeforeRequest(({ request }) => {
    delete request.scope;
  }, 'search')
  .setInstance('platform')
  .build();
