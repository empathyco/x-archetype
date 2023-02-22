import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('scrolling down to result {string}', (resultId: string) => {
  cy.get(`[data-scroll=${resultId}]`).eq(0).scrollIntoView().should('be.visible');
});

Then('url is updated with result {string}', (resultId: string) => {
  cy.url().should('contain', `scroll=${resultId}`);
});

When('the page is reloaded', () => {
  cy.reload();
});

Then('result {string} is visible', (resultId: string) => {
  cy.get(`[data-scroll=${resultId}]`).getByDataTest('result-link').should('be.visible');
});

When('scroll to top is clicked', () => {
  cy.getByDataTest('scroll-to-top').click();
});

Then('scroll position is at top', () => {
  cy.url().should('not.contain', 'scroll');
});
