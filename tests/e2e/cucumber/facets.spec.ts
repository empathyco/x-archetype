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
    .eq(filterNumber)
    .click()
    .invoke('text')
    .as('selectedFilter');
});

Then(
  'filter {int} from facet {int} is selected',
  function (this: { selectedFilter: string }, filterNumber: number, facetNumber: number) {
    cy.getByDataTest('facets-facet')
      .getByDataTest('base-filters-item')
      .eq(facetNumber)
      .get('[data-test=base-filters-item]')
      .eq(filterNumber)
      .get('[data-test=filter]')
      .should('have.attr', 'aria-checked');
    cy.getByDataTest('facets-facet')
      .eq(facetNumber)
      .get('[data-test=base-filters-item]')
      .eq(filterNumber)
      .get('[data-test=filter]')
      .should('contain', this.selectedFilter);
});
