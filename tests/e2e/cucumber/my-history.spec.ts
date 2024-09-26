import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('my history button is clicked', () => {
  cy.getByDataTest('my-history-button').click();
});

Then('my history queries are displayed', () => {
  cy.getByDataTest('my-history-query').should('have.length.at.least', 1);
});

When('my history query number {int} is clicked', (position: number) => {
  cy.getByDataTest('my-history-query').eq(position).getByDataTest('history-query').click();
});

When('my history query number {int} delete button is clicked', (position: number) => {
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
