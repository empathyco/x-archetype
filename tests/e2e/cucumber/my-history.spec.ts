import { And, Then } from 'cypress-cucumber-preprocessor/steps';

And('my history button is clicked', () => {
  cy.getByDataTest('my-history-button').click();
});

And('my history queries are displayed', () => {
  cy.getByDataTest('my-history-query').should('have.length.at.least', 1);
});

And('my history query number {int} is clicked', (position: number) => {
  cy.getByDataTest('my-history-query').eq(position).getByDataTest('history-query').click();
});

And('my history query number {int} delete button is clicked', (position: number) => {
  cy.getByDataTest('my-history-query')
    .eq(position)
    .getByDataTest('remove-history-query')
    .trigger('click');
});

Then('my history is visible', () => {
  cy.getByDataTest('my-history-queries').should('be.visible');
});

Then('my history is not visible', () => {
  cy.getByDataTest('my-history-queries').should('not.be.visible');
});
