// The SnippetConfig import is necessary because TypeScript only loads module augmentation when the module is actually imported
// eslint-disable-next-line unused-imports/no-unused-imports
import type { SnippetConfig } from '@empathyco/x-components'
import type { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries'

declare module '@empathyco/x-components' {
  interface SnippetConfig {
    /**
     * Selector for the container where the search box element will be embedded with the teleport feature.
     *
     * @default "[data-teleport='empathy-search-box-container']"
     */
    searchBoxSelector?: string
    /**
     * Selector for the container where the results element will be embedded with the teleport feature.
     *
     * @default "[data-teleport='empathy-results-container']"
     */
    resultsSelector?: string
    /**
     * Selector of the element the search layer is positioned right below.
     *
     * @default undefined
     */
    layerSelector?: string
    /**
     * View mode of the search experience.
     *
     * fullScreen: The search experience is displayed as a full-screen modal. This mode includes the
     * possibility to specify a layerSelector.
     * embedded: The search experience allows us to "teleport" a part of a component's template into a DOM node.
     * This mode includes the possibility to specify the searchBoxSelector and resultsSelector selectors.
     *
     * @default 'fullScreen'
     */
    viewMode?: 'fullScreen' | 'embedded'
  }

  interface XEventsTypes {
    SemanticQueriesConfigProvided: SemanticQueriesConfig
    UserClickedCloseNextQueries: void
  }
}
