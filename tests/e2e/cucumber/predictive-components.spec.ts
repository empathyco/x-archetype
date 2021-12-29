import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';

And('recommendations are displayed', () => {
  cy.getByDataTest('recommendation-item').should('have.length.at.least', 1);
});

And('search input is focused', () => {
  cy.getByDataTest('search-input').should('be.focused');
});

And('popular searches are displayed', () => {
  cy.getByDataTest('popular-search').should('have.length.at.least', 1);
});

Then('query suggestions are displayed', () => {
  cy.getByDataTest('query-suggestion').should('have.length.at.least', 1);
});

When('focus is set on the search input', () => {
  cy.focusSearchInput();
});

Then('next queries are displayed', () => {
  cy.getByDataTest('next-query').should('have.length.at.least', 1).invoke('text').as('nextQueries');
});

When('search input is cleared', () => {
  cy.clearSearchInput();
});

Then('history queries are displayed', () => {
  cy.getByDataTest('history-query').should('have.length.at.least', 1);
});
