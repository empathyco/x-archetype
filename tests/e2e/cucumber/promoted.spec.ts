import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('promoted is displayed', () => {
  cy.getByDataTest('promoted').should('exist').children().should('have.attr', 'src')
})
