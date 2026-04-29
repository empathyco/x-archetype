import { Then, When } from '@badeball/cypress-cucumber-preprocessor'

Then('results are ordered by {string} in mobile', (sortOrder: string) => {
  cy.getByDataTest('toggle-panel-header').should('contain', sortOrder)
})

When(
  '{string} order is clicked in {string} in mobile',
  (sortOrder: string, sortMenuName: string) => {
    cy.getByDataTest('toggle-panel-header').contains(sortMenuName).click()
    cy.getByDataTest('sort-picker-button').contains(sortOrder).should('exist').click()
  },
)

Then('results are ordered by {string}', (sortOrder: string) => {
  cy.getByDataTest('dropdown-toggle').should('contain', sortOrder)
})

When('{string} order is clicked in {string}', (sortOrder: string, sortMenuName: string) => {
  cy.getByDataTest('dropdown-toggle').contains(sortMenuName).click()
  cy.getByDataTest('dropdown-item').contains(sortOrder).should('exist').click()
})

Then('search request contains the selected sort {string}', (sortURL: string) => {
  cy.wait('@interceptedResults')
    .its('request.url')
    .should('contain', `sort=${sortURL.replace(' ', '+')}`)
})

When('sort dropdown button is clicked on {string}', () => {
  cy.getByDataTest('dropdown-toggle').click({ force: true })
})
