import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ViewportPreset = Cypress.ViewportPreset;

// Scenario 1
Given(
  'a URL with query parameter {string} and {string} size view',
  (query: string, view: ViewportPreset) => {
    cy.viewport(view);
    cy.visit(`/?query=${query}`)
  }
);

Then(
  'search request contains parameter {string} with value {string}',
  (key: string, value: string) => {
    cy.wait('@interceptedResults')
      .its('request.body')
      .then(JSON.parse)
      .should('have.property', key, value);
  }
);

When('navigating back', () => {
  cy.go(-1);
});
