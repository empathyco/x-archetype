import { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries';

declare module '@empathyco/x-components' {
  interface XEventsTypes {
    SemanticQueriesConfigProvided: SemanticQueriesConfig;
    UserAcceptedAWysiwygLogin: void;
  }
}
