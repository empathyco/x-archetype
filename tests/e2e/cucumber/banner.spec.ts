import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('banner is displayed', () => {
  cy.getByDataTest('banner').should('exist').children().should('have.attr', 'src');
});
