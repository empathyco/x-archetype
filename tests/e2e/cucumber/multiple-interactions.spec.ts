import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('related results are displayed', () => {
  cy.getByDataTest('search-grid-result').first().scrollIntoView();
  cy.getByDataTest('search-grid-result')
    .should('be.visible')
    .should('have.length.at.least', 1)
    .invoke('text')
    .as('resultsList');
});

Then('related results have changed', () => {
  cy.getByDataTest('search-grid-result').first().scrollIntoView();
  cy.get<string>('@resultsList').then(resultsList => {
    cy.getByDataTest('search-grid-result')
      .should('be.visible')
      .should('have.length.at.least', 1)
      .should(newResultsList => {
        expect(newResultsList.text()).to.be.not.equal(resultsList);
      })
      .invoke('text')
      .as('resultsList');
  });
});

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
