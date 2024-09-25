import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('no results message is displayed', () => {
  cy.getByDataTest('no-results-message').should('exist');
});

// And('there are no results', () => {
//   cy.getByDataTest('search-grid-result').should('not.exist');
// });
