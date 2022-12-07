import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('scrolling down to result {string}', (resultId: string) => {
  cy.get(`[data-scroll=${resultId}]`)
    .eq(0)
    .scrollIntoView({ offset: { top: -5, left: 0 } })
    .should('be.visible');
});

Then('url is updated with result {string}', (resultId: string) => {
  cy.url().should('contain', `scroll=${resultId}`);
});

Then('scroll position is at top', () => {
  cy.url().should('not.contain', 'scroll');
});
