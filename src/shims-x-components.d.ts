import type { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries'

declare module '@empathyco/x-components' {
  interface SnippetConfig {
    relatedPromptsTarget: string
  }
  interface XEventsTypes {
    SemanticQueriesConfigProvided: SemanticQueriesConfig
  }
}
