import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('scrolling down to result {string}', (resultId: string) => {
  cy.get(`[data-scroll=${resultId}]`)
    .scrollIntoView({ easing: 'swing', offset: { top: -5, left: 0 } })
    .should('be.visible');
});

Then('url is updated with result {string}', (resultId: string) => {
  cy.url().should('contain', `scroll=${resultId}`);
});

Then('scroll position is at top', () => {
  cy.get('#main-scroll').should(scrollContainer => {
    expect(scrollContainer.scrollTop()).to.equal(0);
  });
});
