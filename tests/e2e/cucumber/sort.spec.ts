import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('results are ordered by {string}', (sortOrder: string) => {
  cy.getByDataTest('toggle-panel-header').should('contain', sortOrder);
});

When('{string} order is clicked in {string}', (sortOrder: string, sortMenuName: string) => {
  cy.getByDataTest('toggle-panel-header').contains(sortMenuName).click();
  cy.getByDataTest('sort-picker-button').contains(sortOrder).should('exist').click();
});

Then('search request contains the selected sort {string}', (sortURL: string) => {
  cy.wait('@interceptedResults')
    .its('request.url')
    .should('contain', `sort=${sortURL.replace(' ', '+')}`);
});
