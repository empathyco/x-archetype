import { And, Then } from 'cypress-cucumber-preprocessor/steps';

Then('no results message is displayed', function (this: { searchedQuery: string }) {
  cy.getByDataTest('no-results').should('exist').should('contain', this.searchedQuery);
});

And('there are no results', () => {
  cy.getByDataTest('total-results').should('not.exist');
});
