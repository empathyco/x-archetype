import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('grid shows {int} results per row', (columns: number) => {
  cy.getByDataTest('base-grid').should('have.class', `x-grid--cols-${columns || 'auto'}`);
});

When('value {int} from column picker list is clicked', (columns: number) => {
  cy.get(`.x-column-picker-list__item--${columns}-cols`).click({ scrollBehavior: false });
});

Then('column picker list value {int} is selected', (columns: number) => {
  cy.get(`.x-column-picker-list__item--${columns}-cols`)
    .children()
    .should('have.attr', 'aria-pressed', 'true');
});
