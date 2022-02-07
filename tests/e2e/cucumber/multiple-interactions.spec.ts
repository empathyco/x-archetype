import { Then, When } from 'cypress-cucumber-preprocessor/steps';

let resultsList: string[] = [];
let newResultsList: string[] = [];

Then('related results are displayed', () => {
  resultsList = [];
  cy.getByDataTest('search-grid-result')
    .should('be.visible')
    .should('have.length.at.least', 1)
    .getByDataTest('result-title')
    .each($resultTitle => {
      resultsList.push($resultTitle.text());
    });
});

Then('new related results are displayed', () => {
  cy.getByDataTest('search-grid-result')
    .should('be.visible')
    .should('have.length.at.least', 1)
    .getByDataTest('result-title')
    .each($resultTitle => {
      newResultsList.push($resultTitle.text());
    });
});

Then('new related results are different from previous ones', () => {
  console.log(resultsList[0]);
  console.log(newResultsList[0]);
  expect(newResultsList.every(item => resultsList.includes(item))).to.eq(false);
  resultsList = Object.assign([], newResultsList);
  newResultsList = [];
  console.log(resultsList[0]);
  console.log(newResultsList[0]);
});

When('next query number {int} is clicked', (nextQueryItem: number) => {
  cy.getByDataTest('next-query').eq(nextQueryItem).click().invoke('text').as('searchedQuery');
});

When('scroll down for two seconds', () => {
  cy.getByDataTest('base-scroll').eq(1).scrollTo(0, 1000, { duration: 2000 });
});

When('related tag number {int} is clicked', (relatedTagItem: number) => {
  cy.getByDataTest('related-tag')
    .should('have.length.gt', relatedTagItem)
    .eq(relatedTagItem)
    .click()
    .invoke('text')
    .as('clickedRelatedTag');
});
