import type { XAPI } from '@empathyco/x-components'
import { CssInjector } from '@empathyco/x-archetype-utils'
import { XInstaller } from '@empathyco/x-components'
import { getInstallXOptions } from './x-components/plugin.options'

declare global {
  interface Window {
    __enableVueDevtools__?: boolean
    wysiwyg?: {
      goToLogin: () => Promise<void>
      requestAuth: () => Promise<void>
      open: () => Promise<void>
      close: () => Promise<void>
      setContext: (
        newContext: Partial<{
          query: string | undefined
          spellcheckedQuery: string | undefined
        }>,
      ) => void
    }
    InterfaceX?: XAPI
  }
}

// eslint-disable-next-line no-new
new CssInjector(true)
getInstallXOptions()
  .then(async installXOptions => new XInstaller(installXOptions).init())
  .catch(error => {
    console.error('Error initializing XInstaller:', error)
  })
