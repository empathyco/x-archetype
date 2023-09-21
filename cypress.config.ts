import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 7000,
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  screenshotOnRunFailure: false,
  video: false,
  retries: 1,
  includeShadowDom: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./tests/e2e/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/cucumber/**/*.feature',
    supportFile: 'tests/e2e/support/index.ts',
  },
})
