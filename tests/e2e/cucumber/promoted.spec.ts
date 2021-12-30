import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('promoted is displayed', () => {
  cy.getByDataTest('promoted').should('exist').children().should('have.attr', 'src');
});
