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
    endpoint: '{env}/query/empathy/search',
    responsePaths: {
      results: 'catalog.content',
      facets: 'catalog.facets',
      totalResults: 'catalog.numFound',
      spellcheck: 'catalog.spellchecked',
      banners: 'banner.content',
      promoteds: 'promoted.content',
      redirections: 'direct.content',
      queryTagging: 'catalog.tagging.query'
    }
  })
  .setFeatureConfig('searchById', {
    endpoint: '{env}/query/empathy/skusearch',
    responsePaths: {
      results: 'catalog.content'
    }
  })
  .setFeatureConfig('relatedTags', {
    endpoint: '{env}.empathy.co/relatedtags/empathy',
    responsePaths: {
      relatedTags: 'data.relatedtags'
    }
  })
  .setFeatureConfig('nextQueries', {
    endpoint: '{env}.empathy.co/nextqueries/empathy',
    responsePaths: {
      nextQueries: 'data.nextqueries'
    }
  })
  .setFeatureConfig('suggestions', {
    endpoint: '{env}/query/empathy/empathize',
    responsePaths: {
      suggestions: 'topTrends.content'
    }
  })
  .setFeatureConfig('topRecommendations', {
    endpoint: '{env}/query/empathy/topclicked',
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
  .setResultTrackingConfig({
    click: 'tagging.click',
    add2cart: 'tagging.add2cart',
    checkout: 'tagging.checkout'
  })
  .onBeforeRequest(({ request }) => {
    delete request.scope;
  }, 'topRecommendations')
  .onBeforeRequest(({ request }) => {
    if (request.scope === 'none') {
      delete request.scope;
    }
  }, 'search')
  .setInstance('platform')
  .build();
