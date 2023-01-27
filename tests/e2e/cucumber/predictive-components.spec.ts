import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';

And('recommendations are displayed', () => {
  cy.getByDataTest('recommendation-item').should('have.length.at.least', 1);
});

And('search input is focused', () => {
  cy.getByDataTest('search-input').should('be.focused');
});

And('popular searches are displayed', () => {
  cy.getByDataTest('popular-search').should('have.length.at.least', 1);
});

Then('query suggestions are displayed', () => {
  cy.getByDataTest('query-suggestion').should('have.length.at.least', 1);
});

When('focus is set on the search input', () => {
  cy.focusSearchInput();
});

Then('next queries are displayed', () => {
  cy.getByDataTest('next-query').should('have.length.at.least', 1);
});

Then('history queries are displayed', () => {
  cy.getByDataTest('history-query').should('have.length.at.least', 1);
});

// Scenario 2
Then('related tags are displayed', () => {
  cy.getByDataTest('related-tag').should('have.length.at.least', 1);
});

When('related tag {int} is clicked', (relatedTagIndex: number) => {
  cy.getByDataTest('related-tag')
    .should('have.length.gt', relatedTagIndex)
    .eq(relatedTagIndex)
    .click()
    .invoke('text')
    .as('clickedRelatedTag');
});

Then(
  'clicked related tag is shown in position {int} as selected',
  function (this: { clickedRelatedTag: string }, relatedTagPosition: number) {
    cy.getByDataTest('related-tag')
      .eq(relatedTagPosition)
      .should('have.text', this.clickedRelatedTag)
      .should('have.class', 'x-related-tag--is-selected');
  }
);

Then('related tag {int} is displayed as not selected', (relatedTagItem: number) => {
  cy.getByDataTest('related-tag')
    .eq(relatedTagItem)
    .should('not.have.class', 'x-related-tag--is-selected');
});

// Scenario 3

When('history query number {int} delete button is clicked', (historyQueryItem: number) => {
  cy.getByDataTest('history-query')
    .eq(historyQueryItem)
    .invoke('text')
    .as('deletedHistoryQuery')
    .then(() => {
      cy.focusSearchInput();
      cy.getByDataTest('remove-history-query').eq(historyQueryItem).click();
    });
});

Then(
  'the deleted history query is removed from history queries',
  function (this: { deletedHistoryQuery: string }) {
    cy.getByDataTest('history-query').should(historicalQueries => {
      historicalQueries.each((_, historyQuery) => {
        expect(historyQuery).to.not.have.text(this.deletedHistoryQuery);
      });
    });
  }
);

// Scenario 4
And('an empty search-box', () => {
  cy.clearSearchInput();
});

When('clear history queries button is clicked', () => {
  cy.getByDataTest('clear-history-queries').click();
});

Then('no history queries are displayed', () => {
  cy.getByDataTest('history-queries').should('not.exist');
});
