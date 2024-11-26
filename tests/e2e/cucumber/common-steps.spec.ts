import type { XAPI } from '@empathyco/x-components'
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'
import ViewportPreset = Cypress.ViewportPreset

Given('start page with {string} size view', (view: ViewportPreset) => {
  cy.viewport(view)
  cy.visit('/')
})

Then('search bar is clicked', () => {
  cy.getByDataTest('x').should('exist')
  cy.window().then(window => (window.InterfaceX as XAPI).search())
})

// Search
When('a {string} is typed', (query: string) => {
  cy.getByDataTest('search-input').should('exist').click()
  cy.typeQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery')
  })
})

When('{string} is searched', (query: string) => {
  cy.getByDataTest('search-input').should('exist').click()
  cy.searchQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery')
  })
})

Given('a {string} of queries already searched', (list: string) => {
  cy.searchQueries(...list.split(', '))
})

When('search input is cleared', () => {
  cy.clearSearchInput()
})

// Facets
When('facets are shown if hidden on {string}', (view: ViewportPreset) => {
  if (!view.includes('macbook')) {
    cy.getByDataTest('open-modal-id').click()
  }
})

When('facets are hidden if shown on {string}', (view: ViewportPreset) => {
  if (!view.includes('macbook')) {
    cy.getByDataTest('close-modal-id').click()
  }
})

// Navigation
When('navigating back', () => {
  cy.go('back')
})

// Requests
Then('a search request from {string} is done', (origin: string) => {
  cy.wait(`@interceptedResultsFrom:${origin}`)
})

// Results
Then('related results are displayed', () => {
  cy.getByDataTest('search-grid-result').eq(0).scrollIntoView()
  cy.getByDataTest('search-grid-result')
    .should('be.visible')
    .should('have.length.at.least', 1)
    .invoke('text')
    .as('resultsList')
})

Then('related results have changed', () => {
  cy.getByDataTest('search-grid-result').first().scrollIntoView()
  cy.get<string>('@resultsList').then(resultsList => {
    cy.getByDataTest('search-grid-result')
      .should('be.visible')
      .should('have.length.at.least', 1)
      .should(newResultsList => {
        expect(newResultsList.text()).to.be.not.equal(resultsList)
      })
      .invoke('text')
      .as('resultsList')
  })
})

Then('subheader is not visible', () => {
  cy.getByDataTest('sub-header').should('not.be.visible')
})
