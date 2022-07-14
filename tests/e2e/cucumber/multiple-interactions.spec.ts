import { When } from 'cypress-cucumber-preprocessor/steps';

When('next query number {int} is clicked', (nextQueryItem: number) => {
  cy.getByDataTest('next-query')
    .should('be.visible')
    .eq(nextQueryItem)
    .click()
    .invoke('text')
    .as('searchedQuery');
});

When('scroll down for two seconds', () => {
  cy.get('#main-scroll').scrollTo(0, 1000, { duration: 2000, ensureScrollable: false });
});

When('related tag number {int} is clicked', (relatedTagItem: number) => {
  cy.getByDataTest('related-tag')
    .should('have.length.gt', relatedTagItem)
    .eq(relatedTagItem)
    .click()
    .invoke('text')
    .as('clickedRelatedTag');
});
