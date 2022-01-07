import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { createBannerStub } from '../../../src/__stubs__/banner-stubs.factory';

const mockedApiUrl = 'https://api.staging.empathy.co';
const searchEndpoint = `${mockedApiUrl}/search`;

Given('a results API with a banner', () => {
  cy.intercept(searchEndpoint, req => {
    req.reply({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      banners: createBannerStub('mockedBanner')
    });
  }).as('interceptedBanner');
});

Then('banner is displayed', () => {
  cy.getByDataTest('banner').should('have.attr', 'href');
  cy.getByDataTest('banner').children().should('have.attr', 'src');
});
