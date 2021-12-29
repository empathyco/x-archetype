import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('banner is displayed', () => {
  cy.getByDataTest('banner').should('exist').should('have.attr', 'src');
});
