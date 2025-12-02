import type { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries'

declare module '@empathyco/x-components' {
  interface SnippetConfig {
    searchBoxSelector: string
    resultsSelector: string
    layerSelector: string
    viewMode: 'fullScreen' | 'embedded'
  }

  interface XEventsTypes {
    SemanticQueriesConfigProvided: SemanticQueriesConfig
    UserClickedCloseNextQueries: void
  }
}
