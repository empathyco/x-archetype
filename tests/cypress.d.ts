import type { CustomCommands, CustomDualCommands } from './e2e/support/index'

declare global {
  namespace Cypress {
    interface Chainable extends CustomCommands, CustomDualCommands {}
  }
}
