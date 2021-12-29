import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('promoted is displayed', () => {
  cy.getByDataTest('promoted').should('exist').should('have.attr', 'src');
});
