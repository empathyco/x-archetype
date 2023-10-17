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

/**
 * In this step we have to make 2 scrolls, because in the second scenario in scroll.feature file
 * we want to check if the subheader is collapse when the scroll is at end.
 * First we make a scroll center to collapse the header and calculate the height of the page without
 * the subheader. And then we can reach the bottom because we have the total height of the page.
 */
When('scrolling down to the bottom', () => {
  cy.getByDataTest('query-preview-item')
    .should('have.length.at.least', 5)
    .then(() => {
      cy.getByDataTest('base-scroll').scrollTo('center', { duration: 1000 });
      cy.getByDataTest('base-scroll').scrollTo('bottom', { duration: 500 });
    });
});
