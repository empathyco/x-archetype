import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('banner is displayed', () => {
  cy.getByDataTest('banner').should('have.attr', 'href');
  cy.getByDataTest('banner').children().should('have.attr', 'src');
});
