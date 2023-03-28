import { Given } from 'cypress-cucumber-preprocessor/steps';
const mockedApiUrl = 'https://api.staging.empathy.co';
const searchEndpoint = `${mockedApiUrl}/search/v1/query/empathy/search*`;
const trackEndpoint = `${mockedApiUrl}/tagging/v1/track/empathy`;

// Results
Given('an intercepted search response', () => {
  cy.intercept(searchEndpoint).as('interceptedResults');
});

Given('an intercepted search response from {string}', (origin: string) => {
  cy.intercept({ url: searchEndpoint, query: { origin: `*${origin}*` } }).as(
    `interceptedResultsFrom:${origin}`
  );
});

Given('a results API with query {string}', (query: string) => {
  cy.intercept({
    query: { q: query }
  }).as('interceptedResults');
});

Given('a results API with a promoted', () => {
  cy.intercept(searchEndpoint, { fixture: 'search-response-with-promoted' }).as(
    'interceptedPromoted'
  );
});

Given('a results API with a banner', () => {
  cy.intercept(searchEndpoint, { fixture: 'search-response-with-banner' }).as('interceptedBanner');
});

Given('a results API with known results', () => {
  cy.intercept(searchEndpoint, { fixture: 'search-response-with-known-results' }).as(
    'interceptedResults'
  );
});

// Tagging
Given('a query tagging API', () => {
  cy.intercept(`${trackEndpoint}/query*`).as('queryTagging');
});

Given('an add to cart tagging API', () => {
  cy.intercept(`${trackEndpoint}/add2cart*`).as('addToCartTagging');
});
