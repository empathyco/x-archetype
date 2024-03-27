import { InstallXOptions, SnippetConfig } from '@empathyco/x-components';
import { I18n, cssInjector } from '@empathyco/x-archetype-utils';
import App from '../App.vue';
import * as messages from '../i18n/messages';
import store from '../store';
import { adapter } from '../adapter/adapter';
import { useDevice } from '../composables/use-device.composable';
import { mergeSemanticQueriesConfigWire } from './wiring/semantic-queries.wiring';

const device = useDevice();

/**
 * Function that returns the options to install x-components.
 *
 * Returns - the InstallXOptions.
 */
export async function getInstallXOptions(): Promise<InstallXOptions> {
  if (process.env.VUE_APP_DEVELOPMENT_DOCKER) {
    const { overrideAdapter } = await import('../adapter/docker.adapter');
    overrideAdapter(adapter);
    if (typeof window.initX === 'object') {
      window.initX.lang = 'es';
    }
  }
  return {
    adapter,
    store,
    app: App,
    domElement: getDomElement,
    xModules: {
      facets: {
        config: {
          filtersStrategyForRequest: 'leaves-only'
        }
      },
      semanticQueries: {
        config: {
          threshold: 50,
          maxItemsToRequest: 10
        },
        wiring: {
          SemanticQueriesConfigProvided: {
            mergeSemanticQueriesConfigWire
          }
        }
      }
    },
    async installExtraPlugins({ vue, snippet }) {
      const i18n = await I18n.create({
        locale: snippet.uiLang,
        device: (snippet.device as string) ?? device.deviceName.value,
        fallbackLocale: 'en',
        messages
      });
      vue.use(i18n);
      vue.prototype.$setLocale = i18n.setLocale.bind(i18n);
      vue.prototype.$setLocaleDevice = i18n.setDevice.bind(i18n);

      return {
        i18n: i18n.vueI18n
      };
    }
  };
}

/**
 * Creates a DOM element to mount the X Components app.
 *
 * @param snippetConfig - The snippet configuration.
 * @returns The DOM element.
 */
function getDomElement({ isolate }: SnippetConfig): Element {
  const domElement = document.createElement('div');

  if (isolate || process.env.NODE_ENV === 'production') {
    const container = document.createElement('div');
    container.classList.add('x-root-container');
    const shadowRoot = container.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(domElement);
    document.body.appendChild(container);
    cssInjector.setHost(shadowRoot);
  } else {
    document.body.appendChild(domElement);
    cssInjector.setHost(document.head);
  }

  return domElement;
}
