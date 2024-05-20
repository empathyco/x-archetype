import { CssInjector } from '@empathyco/x-archetype-utils';
import { XInstaller } from '@empathyco/x-components';
import Vue from 'vue';
import { getInstallXOptions } from './x-components/plugin.options';

declare global {
  interface Window {
    __enableVueDevtools__?: boolean;
    wysiwyg?: {
      goToLogin: () => Promise<void>;
      requestAuth: () => Promise<void>;
      open: () => Promise<void>;
      close: () => Promise<void>;
      setContext: (newContext: { query: string | undefined }) => void;
    };
  }
}

Vue.config.productionTip = false;
Vue.config.devtools = window.__enableVueDevtools__ ?? false;

new CssInjector(true);
getInstallXOptions().then(installXOptions => new XInstaller(installXOptions).init());
