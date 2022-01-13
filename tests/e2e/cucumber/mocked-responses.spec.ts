import { EmpathyFacet, EmpathyResult } from '@empathyco/x-adapter';
import { deepMerge } from '@empathyco/x-deep-merge';
import { Given } from 'cypress-cucumber-preprocessor/steps';
import { createBannerStub, PlatformBanner } from '../../../src/__stubs__/banner-stubs.factory';
import {
  createPromotedStub,
  PlatformPromoted
} from '../../../src/__stubs__/promoteds-stubs.factory';

const mockedApiUrl = 'https://api.staging.empathy.co/search/v1/query/*';
const searchEndpoint = `${mockedApiUrl}/search*`;

// Results
Given('a results API with a promoted', () => {
  cy.intercept(searchEndpoint, req => {
    req.reply(createSearchResponse({ promoted: { content: [createPromotedStub('Promotion')] } }));
  }).as('interceptedPromoted');
});

Given('a results API with a banner', () => {
  cy.intercept(searchEndpoint, req => {
    req.reply(createSearchResponse({ banner: { content: [createBannerStub('Banner')] } }));
  }).as('interceptedBanner');
});

/**
 * Creates a search response.
 *
 * @param partial - Partial search response to override default fields.
 * @returns A complete search response object.
 */
function createSearchResponse(partial?: Partial<PlatformSearchResponse>): PlatformSearchResponse {
  return deepMerge(
    <PlatformSearchResponse>{
      catalog: {
        content: getRawResultsStub(),
        facets: [],
        numFound: 24,
        tagging: {
          query: 'https://api.staging.empathy.co/tagging/v1/track/empathy/query?q=shoes'
        }
      },
      banner: {
        content: []
      },
      promoted: {
        content: []
      }
    },
    partial
  );
}

function getRawResultsStub(): unknown[] {
  return Array.from({ length: 24 }, (_, index) => ({
    gender: 'Unisex',
    id: `result-${index}`,
    image: 'https://assets.empathy.co/images-demo/37880.jpg',
    name: `Result ${index}`,
    price: 61.95,
    season: 'Summer',
    tagging: {
      add2cart: 'https://api.staging.empathy.co/tagging/v1/track/empathy/add2cart',
      checkout: 'https://api.staging.empathy.co/tagging/v1/track/empathy/checkout',
      click: 'https://api.staging.empathy.co/tagging/v1/track/empathy/click'
    },
    url: 'https://assets.empathy.co/images-demo/37880.jpg'
  }));
}

interface PlatformSearchResponse {
  catalog: {
    content: EmpathyResult[];
    facets: EmpathyFacet[];
    numFound: number;
    tagging: {
      query: string;
    };
  };
  banner: {
    content: PlatformBanner[];
  };
  promoted: {
    content: PlatformPromoted[];
  };
}
