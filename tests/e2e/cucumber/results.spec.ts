import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('related results are displayed and contain expected elements', () => {
  cy.getByDataTest('result-picture').should('have.length', 24);
  cy.getByDataTest('result-add-to-cart').should('have.length', 24);
  cy.getByDataTest('result-link').should('have.length', 48);
  cy.getByDataTest('result-current-price').should('have.length', 24);
});
