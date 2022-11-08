import { AnyFunction, forEach } from '@empathyco/x-utils';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable extends CustomCommands, CustomDualCommands {}
  }
}

import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;
import Withinable = Cypress.Withinable;
import Shadow = Cypress.Shadow;

/**
 * When the tests are running, there is a problem with the resize observer. After
 * research some time, the issue can be related with Chrome.
 * To avoid this error, the solution is to exclude these error messages.
 * To know more about this solution:
 * https://github.com/cypress-io/cypress/issues/8418.
 * Https://github.com/cypress-io/cypress/issues/22129.
 */
Cypress.on(
  'uncaught:exception',
  err => !err.message.includes('ResizeObserver loop limit exceeded')
);

interface CustomCommands {
  /**
   * Searches a query by typing it in the search input and pressing enter.
   *
   * @example
   * cy.searchAQuery('lego')
   *
   * @param query - The query to search.
   * @returns A Chainable object.
   * @internal
   */
  searchQuery(query: string): Cypress.Chainable<JQuery>;
  /**
   * Searches multiple queries by typing it in the search input and pressing enter.
   *
   * @example
   * cy.searchQueries('lego', 'palymobil')
   *
   * @param queries - The query to search.
   * @returns A Chainable object.
   */
  searchQueries(...queries: string[]): void;
  /**
   * Types a query into the search input.
   *
   * @example
   * cy.typeAQuery('lego')
   *
   * @param query - The query to type in the search input.
   * @returns A Chainable object.
   * @internal
   */
  typeQuery(query: string): Cypress.Chainable<JQuery>;
  /**
   * Focus into the search input.
   *
   * @example
   * cy.focusSearchInput()
   *
   * @returns A Chainable object.
   */
  focusSearchInput(): Cypress.Chainable<JQuery>;
  /**
   * Clear search input.
   *
   * @example
   * cy.clearSearchInput()
   *
   * @returns A Chainable object.
   */
  clearSearchInput(): Cypress.Chainable<JQuery>;
}
interface CustomDualCommands {
  /**
   * Gets a DOM element searching by its data-test attribute.
   *
   * @example
   * cy.getByDataTest('query-suggestion')
   *
   * @param value - The data test attribute value to look for in the DOM.
   * @param options - The options passed to the Cypress command.
   * @returns A Chainable object.
   */
  getByDataTest(value: string, options?: CypressCommandOptions): Cypress.Chainable<JQuery>;
}

type AddPreviousParam<Functions extends Record<keyof Functions, AnyFunction>> = {
  [Key in keyof Functions]: (
    previous: unknown,
    ...args: Parameters<Functions[Key]>
  ) => ReturnType<Functions[Key]>;
};

type CypressCommandOptions = Partial<Loggable & Timeoutable & Withinable & Shadow>;

const customCommands: CustomCommands = {
  searchQuery: query => cy.typeQuery(query).type('{enter}'),
  searchQueries: (...queries) => {
    queries.forEach(query => {
      cy.getByDataTest('search-input').clear();
      cy.typeQuery(query).type('{enter}');
    });
  },
  typeQuery: query => cy.getByDataTest('search-input').type(query),
  focusSearchInput: () => cy.getByDataTest('search-input').click(),
  clearSearchInput: () => cy.getByDataTest('clear-search-input').click()
};

const customDualCommands: AddPreviousParam<CustomDualCommands> = {
  getByDataTest: (previous, value, options?: CypressCommandOptions) => {
    const selector = `[data-test=${value}]`;
    return previous ? cy.wrap(previous).find(selector, options) : cy.get(selector, options);
  }
};

// Register the commands
forEach(customCommands, (name, implementation) => {
  Cypress.Commands.add(name, implementation);
});

forEach(customDualCommands, (name, implementation) => {
  Cypress.Commands.add(name, { prevSubject: 'optional' }, implementation);
});
