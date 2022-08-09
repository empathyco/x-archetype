import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('scrolling down to result {int}', (resultIndex: number) => {
  cy.getByDataTest('search-grid-result')
    .eq(resultIndex)
    .scrollIntoView({
      easing: 'swing',
      duration: 500
    })
    // Re-scroll back again due to probably animation interfering
    .scrollIntoView({
      easing: 'swing',
      duration: 100
    })
    .should('be.visible');
});

Then('url is updated with result {int}', (resultIndex: number) => {
  cy.getByDataTest(`search-grid-result`)
    .eq(resultIndex)
    .invoke('attr', 'data-scroll')
    .then(resultId => {
      expect(resultId).to.be.a('string');
      cy.url().should('contain', `scroll=${resultId!}`);
    });
});

Then('scroll position is at top', () => {
  cy.get('#main-scroll').invoke('scrollTop').should('equal', 0);
  cy.url().should('not.contain', 'scroll');
});
