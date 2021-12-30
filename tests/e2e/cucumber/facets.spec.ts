import { Then, When } from 'cypress-cucumber-preprocessor/steps';

// Scenario 1
Then('facets are displayed', () => {
  cy.getByDataTest('facets-facet').should('have.length.at.least', 1);
});

When('hide-show filters button is clicked', () => {
  cy.getByDataTest('base-id-toggle-button').click();
});

Then('facets are not displayed', () => {
  cy.getByDataTest('facets-facet').should('not.exist');
});

// Scenario 2
When('filter {int} from facet {int} is clicked', (filterNumber: number, facetNumber: number) => {
  cy.getByDataTest('facets-facet')
    .should('have.length.at.least', facetNumber + 1)
    .eq(facetNumber)
    .click();
  cy.getByDataTest('base-filters-item')
    .should('have.length.at.least', filterNumber + 1)
    .getByDataTest('filter')
    .eq(filterNumber)
    .click();
});

Then(
  'filter {int} from facet {int} is selected is {string}',
  (filterNumber: number, facetNumber: number, isSelected: string) => {
    cy.getByDataTest('facets-facet')
      .eq(facetNumber)
      .getByDataTest('base-filters-item')
      .eq(filterNumber)
      .getByDataTest('filter')
      .should('have.attr', 'aria-checked', isSelected);
  }
);

When('clear filters button is clicked', () => {
  cy.getByDataTest('clear-filters').click();
});

// Scenario 4
When('facet {int} is {string}', (facetNumber: number) => {
  cy.getByDataTest('facets-facet').getByDataTest('toggle-panel-header').eq(facetNumber).click();
});

// Scenario 5
When(
  'child filter {int} from parent filter {int} in {int} is clicked',
  (childFilterIndex: number, parentFilterIndex: number, facetNumber: number) => {
    cy.getByDataTest('facets-facet')
      .eq(facetNumber)
      .getByDataTest('base-filters-item')
      .eq(parentFilterIndex)
      .getByDataTest('children-filters')
      .getByDataTest('filter')
      .eq(childFilterIndex)
      .click()
      .invoke('text')
      .as(`clickedChildFilter${childFilterIndex}`);
  }
);

Then(
  'selection status of child filter {int} from parent filter {int} in facet {int} is {string}',
  (
    childFilterIndex: number,
    hierarchicalFilterIndex: number,
    facetIndex: number,
    isSelected: string
  ) => {
    cy.getByDataTest('facets-facet')
      .eq(facetIndex)
      .getByDataTest('base-filters-item')
      .eq(hierarchicalFilterIndex)
      .getByDataTest('children-filters')
      .getByDataTest('filter')
      .eq(childFilterIndex)
      .should('have.attr', 'aria-checked', isSelected);
  }
);

Then(
  'selection status of filter number {int} in facet {int} is {string}',
  (hierarchicalFilterIndex: number, facetIndex: number, isSelected: string) => {
    cy.getByDataTest('facets-facet')
      .eq(facetIndex)
      .getByDataTest('base-filters-item')
      .eq(hierarchicalFilterIndex)
      .getByDataTest('filter')
      .should('have.attr', 'aria-checked', isSelected);
  }
);
