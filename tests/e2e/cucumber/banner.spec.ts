import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('banner is displayed', () => {
  cy.getByDataTest('banner').should('have.attr', 'href');
  cy.getByDataTest('banner').children().should('have.attr', 'src');
});
