import { InstallXOptions } from '@empathyco/x-components';
import { I18n } from '@empathyco/x-archetype-utils';
import App from '../App.vue';
import * as messages from '../i18n/messages';
import store from '../store';
import { adapter } from '../adapter/adapter';
import { useDevice } from '../composables/use-device.composable';

const device = useDevice();
export const installXOptions: InstallXOptions = {
  adapter,
  store,
  app: App,
  xModules: {
    facets: {
      config: {
        filtersStrategyForRequest: 'leaves-only'
      }
    },
    semanticQueries: {
      config: {
        threshold: 50
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
