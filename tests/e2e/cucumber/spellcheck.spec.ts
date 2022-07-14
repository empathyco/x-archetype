import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('spellcheck message is displayed', function (this: { searchedQuery: string }) {
  cy.getByDataTest('spellcheck-message')
    .should('exist')
    .should('contain', this.searchedQuery)
    .getByDataTest('set-spellcheck')
    .should('exist');
});
