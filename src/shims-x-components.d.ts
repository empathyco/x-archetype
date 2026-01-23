/* eslint-disable unused-imports/no-unused-imports */
// Unused imports are necessary because TypeScript only loads module augmentation when the module is actually imported
import type { SnippetConfig } from '@empathyco/x-components'
import type { SemanticQueriesConfig } from '@empathyco/x-components/semantic-queries'
import type { XComponentsAdapter } from '@empathyco/x-types'

declare module '@empathyco/x-components' {
  interface SnippetConfig {
    cart: Record<Result['id'], number>
    wishlist: Result['id'][]
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
    UserClickedResultWithVariants: Result
    UserClickedResultVariantAddToCart: Result
    UserClickedResultVariantRemoveFromCart: Result
    UserClickedResultRemoveFromCart: Result
    UserClickedResultWishlist: Result
  }
}

declare module '@empathyco/x-types' {
  export interface XComponentsAdapter {
    skuSearch: EndpointAdapter
  }

  export interface Result {
    // Empathy Platform properties
    brand?: string
    collection?: string
    description?: string
    hasVariants?: boolean

    // VTEX-specific properties
    maxSale?: number
    availableQuantity?: number
    isOutOfStock?: boolean
    measurementUnit?: string
    tradePolicies?: number[]
    score?: number
    mainImage?: string
    isVisible?: boolean
    categories?: string[]
    isActive?: boolean
    textLink?: string
    productId?: string
    boostId?: string
  }
}
