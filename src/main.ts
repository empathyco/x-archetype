import type { XCSSInjector } from '@empathyco/x-archetype-utils'
import type { SnippetConfig } from '@empathyco/x-components'
import type { InstanceExtensions } from './types'
import { CssInjector } from '@empathyco/x-archetype-utils'
import { XInstaller } from '@empathyco/x-components'
import { UI_CONFIG_KEY } from './types'
import { getInstallXOptions } from './x-components/plugin.options'

declare global {
  interface Window {
    xCSSInjector: XCSSInjector
    __enableVueDevtools__?: boolean
    wysiwyg?: {
      goToLogin: () => Promise<void>
      requestAuth: () => Promise<void>
      open: () => Promise<void>
      close: () => Promise<void>
      setConfig: (
        newContext: Partial<{
          query: string | undefined
          spellcheckedQuery: string | undefined
        }>,
      ) => void
    }
  }
}

// eslint-disable-next-line no-new
new CssInjector(true)

getInstallXOptions()
  .then(async installXOptions => {
    const instance = (window.initX as SnippetConfig).instance

    let instanceExtensions: InstanceExtensions = {}

    try {
      instanceExtensions = (await import(
        `./instance-extensions/${instance}/${instance}-init.ts`
      )) as InstanceExtensions
    } catch {
      console.warn(`No instance extension found for ${instance}, using defaults`)
    }

    if (instanceExtensions.adapter) {
      installXOptions.adapter = instanceExtensions.adapter
    }

    if (instanceExtensions.ui) {
      installXOptions.onCreateApp = app => {
        app.provide(UI_CONFIG_KEY, instanceExtensions.ui ?? {})
      }
    }

    return new XInstaller(installXOptions).init()
  })
  .catch(error => {
    console.error('Error initializing XInstaller:', error)
  })
