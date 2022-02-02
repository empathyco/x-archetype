import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ViewportPreset = Cypress.ViewportPreset;

Given('start page with {string} size view', (view: ViewportPreset) => {
  cy.viewport(view);
  cy.visit('/');
});

Given('an intercepted search response', () => {
  cy.intercept('https://api.staging.empathy.co/search/v1/query/*/search*').as('interceptedResults');
});

Then('start button is clicked', () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(100);
  cy.getByDataTest('start-button').click();
});

When('a {string} is typed', (query: string) => {
  cy.typeQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery');
  });
});

When('{string} is searched', (query: string) => {
  cy.searchQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery');
  });
});

When('facets are shown if hidden on {string}', (view: ViewportPreset) => {
  if (!view.includes('macbook')) {
    cy.getByDataTest('open-modal-id').click();
  }
});
