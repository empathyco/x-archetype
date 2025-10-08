import type { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries'

declare module '@empathyco/x-components' {
  interface SnippetConfig {
    searchBoxTarget: string
    gridTarget: string
  }

  interface XEventsTypes {
    SemanticQueriesConfigProvided: SemanticQueriesConfig
    UserClickedCloseNextQueries: void
  }
}
