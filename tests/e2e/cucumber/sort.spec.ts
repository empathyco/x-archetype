import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('results are ordered by {string}', (sortOrder: string) => {
  cy.getByDataTest('sort-dropdown-toggle').should('contain', sortOrder);
});

When('{string} order is clicked', (sortOrder: string) => {
  cy.getByDataTest('sort-dropdown-toggle').click();
  cy.getByDataTest('dropdown-item').children().contains(sortOrder).click();
});

Then('search request contains the selected sort {string}', (sortOption: string) => {
  cy.wait('@interceptedResults')
    .its('request.url')
    .should('contain', `sort=${sortOption.replace(' ', '+')}`);
});
