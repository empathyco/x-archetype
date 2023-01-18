import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import ViewportPreset = Cypress.ViewportPreset;

Given('start page with {string} size view', (view: ViewportPreset) => {
  cy.viewport(view);
  cy.visit('/');
});

Then('search bar is clicked', () => {
  cy.getByDataTest('x').should('exist');
  cy.getByDataTest('start-searchbar').click();
});

// Search
When('a {string} is typed', (query: string) => {
  cy.typeQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery');
  });
});

When('{string} is searched', (query: string) => {
  cy.searchQuery(query).then(() => {
    cy.getByDataTest('search-input').invoke('val').as('searchedQuery');
  });
});

// Facets
When('facets are shown if hidden on {string}', (view: ViewportPreset) => {
  if (!view.includes('macbook')) {
    cy.getByDataTest('open-modal-id').click();
  }
});

When('facets are hidden if shown on {string}', (view: ViewportPreset) => {
  if (!view.includes('macbook')) {
    cy.getByDataTest('close-modal-id').click();
  }
});

// Navigation
When('navigating back', () => {
  cy.go('back');
});

// Requests
Then('search request contains the origin {string} in the URL', (origin: string) => {
  cy.wait('@interceptedResults').its('request.url').should('contain', `origin=${origin}`);
});

// Results
Then('related results are displayed', () => {
  cy.getByDataTest('search-grid-result')
    .should('be.visible')
    .should('have.length.at.least', 1)
    .invoke('text')
    .as('resultsList');
});

Then('related results have changed', () => {
  cy.getByDataTest('search-grid-result').first().scrollIntoView();
  cy.get<string>('@resultsList').then(resultsList => {
    cy.getByDataTest('search-grid-result')
      .should('be.visible')
      .should('have.length.at.least', 1)
      .should(newResultsList => {
        expect(newResultsList.text()).to.be.not.equal(resultsList);
      })
      .invoke('text')
      .as('resultsList');
  });
});
