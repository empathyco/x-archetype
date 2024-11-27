import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('spellcheck message is displayed', function (this: { searchedQuery: string }) {
  cy.getByDataTest('spellcheck-message')
    .should('exist')
    .should('contain', this.searchedQuery)
    .getByDataTest('set-spellcheck')
    .should('exist')
})
