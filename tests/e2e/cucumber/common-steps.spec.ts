import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ViewportPreset = Cypress.ViewportPreset;

Given('start page with {string} size view', (view: ViewportPreset) => {
  cy.viewport(view);
  cy.visit('/');
});

Given('start page with {string} size view and mocked adapter', (view: ViewportPreset) => {
  cy.viewport(view);
  cy.visit('/useMockedAdapter=true');
});

Then('start button is clicked', () => {
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

When('facets are hidden if shown on {string}', (view: ViewportPreset) => {
  if (!view.includes('macbook')) {
    cy.getByDataTest('close-modal-id').click();
  }
});

Then('search request contains the origin {string} in the URL', (origin: string) => {
  cy.wait('@interceptedResults').its('request.url').should('contain', `origin=${origin}`);
});
