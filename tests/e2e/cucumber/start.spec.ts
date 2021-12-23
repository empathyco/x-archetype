import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('start page', () => {
  cy.visit('/');
});

Then('start button is clicked', () => {
  cy.getByDataTest('start-button').click();
});
