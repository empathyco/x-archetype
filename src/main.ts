import { CssInjector } from '@empathyco/x-archetype-utils';
import { XInstaller } from '@empathyco/x-components';
import { getInstallXOptions } from './x-components/plugin.options';

declare global {
  interface Window {
    __enableVueDevtools__?: boolean;
    wysiwyg?: {
      goToLogin: () => Promise<void>;
      requestAuth: () => Promise<void>;
      open: () => Promise<void>;
      close: () => Promise<void>;
      setContext: (
        newContext: Partial<{
          query: string | undefined;
          spellcheckedQuery: string | undefined;
        }>
      ) => void;
    };
  }
}

new CssInjector(true);
getInstallXOptions().then(installXOptions => new XInstaller(installXOptions).init());
