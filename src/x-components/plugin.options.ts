import { InstallXOptions } from '@empathyco/x-components';
import App from '../App.vue';
import { I18n } from '../i18n/i18n.plugin';
import * as messages from '../i18n/messages';
import store from '../store';
import { adapter } from '../adapter/adapter';

export const installXOptions: InstallXOptions = {
  adapter,
  store,
  app: App,
  async installExtraPlugins({ vue, snippet }) {
    const i18n = await I18n.create({
      locale: snippet.lang,
      device: snippet.device ?? 'mobile',
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
