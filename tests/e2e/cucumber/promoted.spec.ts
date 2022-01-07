import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { createPromotedStub } from '../../../src/__stubs__/promoteds-stubs.factory';

const mockedApiUrl = 'https://api.staging.empathy.co';
const searchEndpoint = `${mockedApiUrl}/search`;

Given('a results API with a promoted item', () => {
  cy.intercept(searchEndpoint, req => {
    req.reply({
      promoteds: createPromotedStub('mockedPromotedItem')
    });
  }).as('interceptedBanner');
});

Then('promoted is displayed', () => {
  cy.getByDataTest('promoted').should('exist').children().should('have.attr', 'src');
});
