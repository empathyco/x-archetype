import { And, Then } from 'cypress-cucumber-preprocessor/steps';

Then('no results message is displayed', () => {
  cy.getByDataTest('no-results').should('exist');
});

And('there are no results', () => {
  cy.getByDataTest('total-results').should('not.exist');
});
