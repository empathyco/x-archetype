import { Given } from 'cypress-cucumber-preprocessor/steps';

const mockedApiUrl = 'https://api.staging.empathy.co/search/v1/query/*';
const searchEndpoint = `${mockedApiUrl}/search*`;

// Results
Given('a results API with a promoted', () => {
  cy.intercept(searchEndpoint, { fixture: 'search-response-with-promoted' }).as(
    'interceptedPromoted'
  );
});

Given('a results API with a banner', () => {
  cy.intercept(searchEndpoint, { fixture: 'search-response-with-banner' }).as('interceptedBanner');
});
