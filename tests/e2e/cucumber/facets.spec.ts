import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import '../cucumber/global-definitions';
import ViewportPreset = Cypress.ViewportPreset;

/**
 * Click on a filter from a certain facet.
 *
 * @param facetName - Name of the facet which the filter to be clicked belongs to.
 * @param nthFilter - Position of the filter to be clicked.
 *
 * @internal
 */
function clickFacetNthFilter(facetName: string, nthFilter: number): void {
  cy.getByDataTest(facetName)
    .getByDataTest('filter')
    .eq(nthFilter)
    .click('top')
    .invoke('text')
    .as(`clickedFilter${nthFilter}`);
}

// Scenario 1
Then('facets are displayed is {boolean}', (areVisible: boolean) => {
  cy.getByDataTest('facets-facet').should(`${areVisible ? '' : 'not.'}exist`);
});

When(
  'hide-show filters button is clicked on {string} after facets being displayed is {boolean}',
  (view: ViewportPreset, areFacetsVisible: boolean) => {
    if (view.includes('macbook')) {
      cy.getByDataTest('base-id-toggle-button').click();
    } else {
      cy.getByDataTest(`${areFacetsVisible ? 'close' : 'open'}-modal-id`).click();
    }
  }
);

// Scenario 2
When('facet {string} is {string}', (facetName: string) => {
  cy.getByDataTest(facetName).click();
});

When('filter {int} from facet {string} is clicked', (filterNumber: number, facetName: string) => {
  clickFacetNthFilter(facetName, filterNumber);
});

Then(
  'filter {int} from facet {string} is selected is {boolean}',
  function (this: any, filterNumber: number, facetName: string, isSelected: boolean) {
    cy.getByDataTest(facetName)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      .contains(this[`clickedFilter${filterNumber}`].trim())
      .should(`${isSelected ? '' : 'not.'}to.have.class`, 'x-filter--is-selected');
  }
);

When('clear filters button is clicked', () => {
  cy.getByDataTest('clear-filters').click();
});

// Scenario 5
When(
  'child filter {int} from parent filter {int} in {string} is clicked',
  (childFilterIndex: number, parentFilterIndex: number, facetName: string) => {
    cy.getByDataTest(facetName)
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
  'selection status of child filter {int} from parent filter {int} in facet {string} is {boolean}',
  function (
    this: any,
    childFilterIndex: number,
    hierarchicalFilterIndex: number,
    facetName: string,
    isSelected: boolean
  ) {
    cy.getByDataTest(facetName)
      .getByDataTest('base-filters-item')
      .eq(hierarchicalFilterIndex)
      .getByDataTest('children-filters')
      .getByDataTest('filter')
      .eq(childFilterIndex)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      .should('contain', this[`clickedChildFilter${childFilterIndex}`].replace(/[^a-z]/gi, ''))
      .should(`${isSelected ? '' : 'not.'}to.have.class`, 'x-filter--is-selected');
  }
);

Then(
  'selection status of filter number {int} in facet {string} is {boolean}',
  (hierarchicalFilterIndex: number, facetName: string, isSelected: boolean) => {
    cy.getByDataTest(facetName)
      .getByDataTest('base-filters-item')
      .eq(hierarchicalFilterIndex)
      .getByDataTest('filter')
      .should(`${isSelected ? '' : 'not.'}to.have.class`, 'x-filter--is-selected');
  }
);
