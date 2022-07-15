import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('scrolls down to next page', () => {
  cy.getByDataTest('result-link').last().scrollIntoView({ easing: 'linear', duration: 2000 });
});

Then('query tagging request should be triggered', () => {
  cy.wait('@queryTagging');
});

Then('query tagging request has been triggered', () => {
  cy.get('@queryTagging').should('exist');
});

Then('page {int} query tagging request is triggered', (pageNumber: number) => {
  cy.wait('@queryTagging').its('request.url').should('contain', `page=${pageNumber}`);
});

Then('results page number {int} is loaded', (page: number) => {
  cy.getByDataTest('search-grid-result').should('have.length', 24 * page);
});

Then('add product to cart tagging request has been triggered', () => {
  cy.wait('@addToCartTagging').should('exist');
});

When('pdp add to cart button is clicked', () => {
  cy.getByDataTest('search-grid-result').should('be.visible').first().as('firstVisibleResult');
  cy.get('@firstVisibleResult')
    .getByDataTest('result-add-to-cart')
    .invoke('show')
    .click({ force: true });
});
