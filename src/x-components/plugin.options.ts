import type { InstallXOptions, SnippetConfig } from '@empathyco/x-components'
import type { Messages } from '../i18n/messages.types'
import type { InstanceExtensions } from '../types'
import { cssInjector } from '@empathyco/x-archetype-utils'
import { filter } from '@empathyco/x-components'
import { addQueryToHistoryQueries } from '@empathyco/x-components/history-queries'
import { setSearchQuery } from '@empathyco/x-components/search'
import { setUrlQuery } from '@empathyco/x-components/url'
import { createI18n } from 'vue-i18n'
import { adapter } from '../adapter/adapter'
import AppComponent from '../App.vue'
import store from '../store'
import { mergeSemanticQueriesConfigWire } from './wiring/semantic-queries.wiring'

const setSearchQueryFiltered = filter(
  setSearchQuery,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)

const addQueryToHistoryQueriesFiltered = filter(
  addQueryToHistoryQueries,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)

const setUrlQueryFiltered = filter(
  setUrlQuery,
  ({ eventPayload }) => !eventPayload.startsWith('::'),
)

/**
 * Function that returns the options to install x-components.
 *
 * Returns - the InstallXOptions.
 */
export async function getInstallXOptions(): Promise<InstallXOptions> {
  return {
    adapter,
    // eslint-disable-next-line ts/no-unsafe-assignment
    store,
    rootComponent: AppComponent,
    domElement: getDomElement,
    xModules: {
      facets: {
        config: {
          filtersStrategyForRequest: 'leaves-only',
        },
      },
      semanticQueries: {
        config: {
          threshold: 50,
          maxItemsToRequest: 10,
        },
        wiring: {
          SemanticQueriesConfigProvided: {
            mergeSemanticQueriesConfigWire,
          },
        },
      },
      search: {
        wiring: {
          UserAcceptedAQuery: {
            setSearchQuery: setSearchQueryFiltered,
          },
        },
      },
      historyQueries: {
        wiring: {
          UserAcceptedAQuery: {
            addQueryToHistoryQueries: addQueryToHistoryQueriesFiltered,
          },
        },
      },
      url: {
        wiring: {
          UserAcceptedAQuery: {
            setUrlQuery: setUrlQueryFiltered,
          },
        },
      },
    },
    async installExtraPlugins({ app, snippet }) {
      // Normalize locale to first 2 characters in lowercase (e.g., 'es_ES' -> 'es')
      const normalizedLocale = snippet.uiLang.substring(0, 2).toLowerCase()

      const i18n = createI18n({
        legacy: false,
        locale: normalizedLocale,
        fallbackLocale: 'en',
      })

      app.use(i18n)

      const baseMessages = (await import(`../i18n/messages/${normalizedLocale}.messages.json`)) as {
        default: Messages
      }

      // Set base messages first
      i18n.global.setLocaleMessage(normalizedLocale, baseMessages.default)

      // Try to load and merge instance-specific messages
      try {
        const instanceExtensions = (await import(
          `../instance-extensions/${snippet.instance}/${snippet.instance}-init.ts`
        )) as InstanceExtensions

        if (instanceExtensions.messages?.[normalizedLocale]) {
          i18n.global.mergeLocaleMessage(
            normalizedLocale,
            instanceExtensions.messages[normalizedLocale],
          )
        }
      } catch {
        console.warn(
          `No instance-specific messages found for ${snippet.instance} (${normalizedLocale}), using base messages only`,
        )
      }
    },
  }
}

/**
 * Creates a DOM element to mount the X Components app.
 *
 * @param snippetConfig - The snippet configuration.
 * @param snippetConfig.isolate - Whether to isolate the DOM element using Shadow DOM.
 * @returns The DOM element.
 */
function getDomElement({ isolate }: SnippetConfig): ShadowRoot | HTMLElement {
  const container = document.createElement('div')
  container.classList.add('x-root-container')
  document.body.appendChild(container)

  if (isolate === false) {
    cssInjector.addHost(document)
    return container
  }

  const shadowRoot = container.attachShadow({ mode: 'open' })
  cssInjector.addHost(shadowRoot)
  return shadowRoot
}
