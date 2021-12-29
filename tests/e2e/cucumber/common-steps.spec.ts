import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('start page', () => {
  cy.visit('/');
});

Then('start button is clicked', () => {
  cy.getByDataTest('start-button').click();
});

When('a {string} is typed', (query: string) => {
  cy.typeQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery');
  });
});
