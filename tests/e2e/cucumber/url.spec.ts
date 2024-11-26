import { Given } from '@badeball/cypress-cucumber-preprocessor'
import ViewportPreset = Cypress.ViewportPreset

// Scenario 1
Given(
  'a URL with query parameter {string} and {string} size view',
  (query: string, view: ViewportPreset) => {
    cy.viewport(view)
    cy.visit(`/?query=${query}`)
  },
)
