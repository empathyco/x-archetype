import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('start page', () => {
  cy.visit('/');
});

Given('an intercepted search response', () => {
  cy.intercept('https://api.staging.empathy.co/search/v1/query/*/search*').as('interceptedResults');
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
