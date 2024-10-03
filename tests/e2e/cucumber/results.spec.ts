import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('related results are displayed and contain expected elements', () => {
  cy.getByDataTest('search-grid-result').should('have.length', 24);
});
