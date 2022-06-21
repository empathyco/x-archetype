import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('grid shows {int} results per row', (columns: number) => {
  cy.getByDataTest('grid').should('have.class', `x-grid--cols-${columns || 'auto'}`);
});

When('value {int} from column picker list is clicked', (columns: number) => {
  cy.getByDataTest('column-picker-list')
    .children(`.x-column-picker-list__item--${columns}-cols`)
    .should('be.visible')
    .click();
});

Then('column picker list value {int} is selected', (columns: number) => {
  cy.getByDataTest('column-picker-list')
    .children(`.x-column-picker-list__item--${columns}-cols`)
    .children()
    .should('have.attr', 'aria-selected', 'true');
});
